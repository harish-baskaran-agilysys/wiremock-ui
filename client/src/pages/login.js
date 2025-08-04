import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Button from "wiremock/components/native/button";
import Header from "wiremock/components/native/header";
import { initializeUserRole } from "../components/utils/roles";
import { enableAuth } from "wiremock/components/utils/withAuth";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!enableAuth) {
      router.replace("/manual-login");
      return;
    }

    if (session?.user?.email) {
      initializeUserRole(session.user.email).then(() => {
        router.push("/app/mappings");
      });
    }
  }, [session]);

  if (!enableAuth) {
    return null; // Prevent rendering before redirect
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col gap-3 border-4 border-dotted border-sky-400 rounded p-10 justify-center">
        <Header 
          size="extralarge"
          className="flex justify-center"
          label="Welcome to Stay Wiremock UI"
        />
        <Button
          className="ml-10 mt-5 flex justify-center"
          icon="fab fa-github"
          size="extralarge"
          onClick={() => signIn("github")}
          label="Sign in with GitHub"
        />
      </div>
    </div>
  );
}