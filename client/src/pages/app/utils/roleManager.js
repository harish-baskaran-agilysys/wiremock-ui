import React, { useEffect, useState, useMemo } from "react";
import bcrypt from "bcryptjs";
import { getFileContent, postFileContent, putFileContent } from "wiremock/axios";
import Input from "wiremock/components/native/input";
import Button from "wiremock/components/native/button";
import Header from "wiremock/components/native/header";
import { decryptData, encryptData } from "./roleEncryption";
import { initializeDefaultRolesFile, LOCAL_STORAGE_ROLE_KEY, ROLE_OPTIONS } from "./roles";

const RoleManager = () => {
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("viewer");
  const [newPassword, setNewPassword] = useState("");
  const [passwordInputs, setPasswordInputs] = useState({}); // Track password input per user

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const encrypted = await getFileContent();
        const decrypted = decryptData(encrypted["roles"]);
        setRoles(
          Object.entries(decrypted).map(([email, data]) => ({
            email,
            role: data.role,
            password: data.password,
          }))
        );
      } catch {
        console.warn("File fetch failed, trying localStorage...");
        let stored = localStorage.getItem(LOCAL_STORAGE_ROLE_KEY);

        if (!stored) {
          console.warn("localStorage empty, initializing with FIRST_USERS...");
          stored = await initializeDefaultRolesFile();
        } else {
          try {
            await postFileContent({ roles: stored });
          } catch {}
        }

        try {
          const decrypted = decryptData(stored);
          setRoles(
            Object.entries(decrypted).map(([email, data]) => ({
              email,
              role: data.role,
              password: data.password,
            }))
          );
        } catch (e) {
          console.error("localStorage decryption failed:", e);
          setRoles([]);
        }
      }
    };

    fetchRoles();
  }, []);

  const filteredRoles = useMemo(() => {
    if (!searchTerm.trim()) return roles;
    return roles.filter((r) =>
      r.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, roles]);

  const saveRoles = async (updatedRoles) => {
    try {
      const roleObject = Object.fromEntries(
        updatedRoles.map(({ email, role, password }) => [
          email,
          { role, password },
        ])
      );
      const encrypted = encryptData(roleObject);
      const data = { roles: encrypted };
      await putFileContent(data);
      setRoles(updatedRoles);
    } catch (err) {
      console.error("Failed to save roles:", err);
    }
  };

  const handleAdd = () => {
    if (!newEmail || roles.some((r) => r.email === newEmail)) return;

    const hashedPassword = bcrypt.hashSync(newPassword || "", 10);

    const updated = [
      ...roles,
      { email: newEmail, role: newRole, password: hashedPassword },
    ];
    saveRoles(updated);
    setNewEmail("");
    setNewRole("viewer");
    setNewPassword("");
  };

  const updateRole = (email, newRole) => {
    if (!ROLE_OPTIONS.includes(newRole)) {
      console.warn(`Invalid role: ${newRole}`);
      return;
    }
    const updated = roles.map((r) =>
      r.email === email ? { ...r, role: newRole } : r
    );
    saveRoles(updated);
  };

  // Update password only when Update button is clicked
  const updatePassword = (email) => {
    const newPassword = passwordInputs[email];
    if (!newPassword || newPassword.trim() === "") {
      // ignore empty input
      return;
    }
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const updated = roles.map((r) =>
      r.email === email ? { ...r, password: hashedPassword } : r
    );
    saveRoles(updated);
    // Clear input after update
    setPasswordInputs((prev) => ({ ...prev, [email]: "" }));
  };

  const handleRemove = (email) => {
  const updated = roles.filter((r) => r.email !== email);
  saveRoles(updated);
};

  return (
    <div className="flex flex-col gap-4 p-4 ">
      <Header label="Role Manager" className="text-lg font-bold" />

      <Input
        placeholder="Search by email"
        value={searchTerm}
        setValue={setSearchTerm}
      />

      <div className="flex gap-2 items-center">
        <Input
          placeholder="New member email"
          value={newEmail}
          setValue={setNewEmail}
          className="w-[350px]"
        />
        <Input
          placeholder="Password"
          type="password"
          value={newPassword}
          setValue={setNewPassword}
          className="w-[200px]"
        />
        <select
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          className="border rounded p-2"
        >
          {ROLE_OPTIONS.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <Button label="Add" onClick={handleAdd} />
      </div>

      <div className="flex flex-col gap-2">
        {filteredRoles.map((user) => (
          <div
            key={user.email}
            className="flex items-center justify-between border p-2 rounded"
          >
            <span>{user.email}</span>
            <div className="flex gap-2 items-center">
              <select
                value={user.role}
                onChange={(e) => updateRole(user.email, e.target.value)}
                className="border rounded p-1"
              >
                {ROLE_OPTIONS.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>

              <input
                type="password"
                placeholder="Change password"
                className="w-[200px] border rounded p-1"
                value={passwordInputs[user.email] || ""}
                onChange={(e) =>
                  setPasswordInputs((prev) => ({
                    ...prev,
                    [user.email]: e.target.value,
                  }))
                }
              />

              <Button
                label="Update"
                onClick={() => updatePassword(user.email)}
                disabled={!passwordInputs[user.email]}
              />

              <Button
                label="Remove"
                onClick={() => handleRemove(user.email)}
                type="error"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleManager;
