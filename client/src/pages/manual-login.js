import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { sessionAtom } from "wiremock/recoil/atoms";
import Input from "wiremock/components/native/inputNoChange";
import Button from "wiremock/components/native/button";
import Header from "wiremock/components/native/header";
import { initializeUserRole } from "./app/utils/roles";

export default function ManualLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const setSession = useSetRecoilState(sessionAtom);

  const handleLogin = async  () => {
    const sessionData = {
      user: { email }
    };

    await initializeUserRole(email);

    // Save to localStorage
    localStorage.setItem("manualSession", JSON.stringify(sessionData));

    // Update recoil session
    setSession(sessionData);

    router.push("/app/mappings");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="border border-sky-600 rounded p-8 shadow-md w-96">
        <Header label="Enter User Details" size="large" className="mb-4 flex justify-center"/>
        <Input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          onClick={handleLogin}
          className="w-full"
          label="Continue"
        />
      </div>
    </div>
  );
}
