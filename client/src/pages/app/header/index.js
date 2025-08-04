import React, { useState, useEffect } from "react";
import Button from "wiremock/components/native/button";
import ServerHandling from "./serverHandling";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Header from "wiremock/components/native/header";
import { enableAuth } from "wiremock/components/utils/withAuth";

const HeaderMapping = () => {
  const { data: session, status } = useSession();
  const [stored, setStored] = useState(null);

  useEffect(() => {
    if (!enableAuth && typeof window !== "undefined") {
      const manualSession = localStorage.getItem("manualSession");
      if (manualSession) {
        try {
          setStored(JSON.parse(manualSession));
        } catch (e) {
          console.error("Invalid manualSession in localStorage", e);
        }
      }
    }
  }, []);

  return (
    <div className="border-b-2 border-sky-400 border-solid flex justify-between w-full">
      <img
        src="/wiremock_logo.jpg"
        alt="Logo"
        className="w-[85px] h-[70px] !ml-[30px] !p-0 !m-0"
      />

      <Header
        className="flex justify-center items-center"
        size="large"
        label={`Welcome, ${
          session?.user?.email || stored?.user.email || "Guest"
        }`}
      />

      <div className="flex gap-2">
        <div className="mt-5">
          <ServerHandling />
        </div>
        {enableAuth ? (
          <Button
            icon="fab fa-github"
            label="Github Signout"
            type="primary_inverse"
            className="mr-5 mt-5"
            onClick={() => signOut({ callbackUrl: "/login" })}
          />
        ) : (
          <Button
            label="Signout"
            type="primary_inverse"
            className="mr-5 mt-5"
            onClick={() => signOut({ callbackUrl: "/manual-login" })}
          />
        )}
      </div>
    </div>
  );
};

export default HeaderMapping;
