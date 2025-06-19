// hoc/withAuth.js
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const enableAuth = process.env.NEXT_PUBLIC_ENABLE_AUTH === 'true';

export function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (!enableAuth) return; // auth check disabled
      if (status === "loading") return;
      if (!session) router.push("/login");
    }, [session, status]);

    // Default session if auth is disabled or session is missing
    const defaultSession = {
      user: { name: "Guest", email: "guest@example.com" }
    };

    const safeSession = session || defaultSession;

    if (!enableAuth) {
      return <Component {...props} session={safeSession} />; // pass default session if auth off
    }

    if (session) {
      return <Component {...props} session={safeSession} />; // pass real session if logged in
    }

    return <div>Loading...</div>; // or a spinner if you like
  };
}
