import React, { useEffect, useState, useMemo } from "react";
import { getFileContent, postFileContent, putFileContent } from "wiremock/axios";
import Input from "wiremock/components/native/input";
import Button from "wiremock/components/native/button";
import Header from "wiremock/components/native/header";
import { decryptData, encryptData } from "./roleEncryption";
import { LOCAL_STORAGE_ROLE_KEY, ROLE_OPTIONS } from "./roles";

const RoleManager = () => {
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("viewer");

 useEffect(() => {
    const fetchRoles = async () => {
      try {
        const encrypted = await getFileContent();
        const decrypted = decryptData(encrypted["roles"]);
        setRoles(Object.entries(decrypted).map(([email, role]) => ({ email, role })));
      } catch {
        console.warn("File fetch failed, trying localStorage...");
        let stored = localStorage.getItem(LOCAL_STORAGE_ROLE_KEY);

        if (!stored) {
          console.warn("localStorage empty, initializing with FIRST_USERS...");
          stored = await initializeDefaultRolesFile();
        } else {
          try { await postFileContent({ roles: stored }); } catch {}
        }

        try {
          const decrypted = decryptData(stored);
          setRoles(Object.entries(decrypted).map(([email, role]) => ({ email, role })));
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
        updatedRoles.map(({ email, role }) => [email, role])
      );
      const encrypted = encryptData(roleObject);
      const data = { "roles" : encrypted }
      await putFileContent(data);
      setRoles(updatedRoles);
    } catch (err) {
      console.error("Failed to save roles:", err);
    }
  };

  const handleAdd = () => {
    if (!newEmail || roles.some((r) => r.email === newEmail)) return;
    const updated = [...roles, { email: newEmail, role: newRole }];
    saveRoles(updated);
    setNewEmail("");
    setNewRole("viewer");
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

  const handleRemove = (email) => {
    const updated = roles.filter((r) => r.email !== email);
    saveRoles(updated);
  };

  return (
    <div className="flex flex-col gap-4 p-4 w-[50%]">
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
          className="w-[550px]"
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
