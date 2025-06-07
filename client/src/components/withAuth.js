// hoc/withAuth.js
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return; // wait for session
      if (!session) router.push("/login"); // redirect if no session
    }, [session, status]);

    if (session) {
      return <Component {...props} />;
    }

    // Optionally show a loading spinner while checking auth
    return <div>Loading...</div>;
  };
}
