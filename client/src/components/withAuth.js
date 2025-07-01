// hoc/withAuth.js
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { sessionAtom } from "wiremock/recoil/atoms";
import { useRecoilState } from "recoil";

export const enableAuth = process.env.NEXT_PUBLIC_ENABLE_AUTH === 'true';

export function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [localSession, setLocalSession] = useRecoilState(sessionAtom);

    useEffect(() => {
      if (!enableAuth) {
        // Load from localStorage only once
        const stored = localStorage.getItem("manualSession");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setLocalSession(parsed);
          } catch (e) {
            console.error("Failed to parse local manual session", e);
          }
        }
        return;
      }
      if (status === "loading") return;
      if (!session) router.push("/login");
    }, [session, status]);

    const activeSession = enableAuth ? session : localSession;

    if (enableAuth && (status === "loading" || !session)) {
      return <div>Loading...</div>;
    }

    return <Component {...props} session={activeSession} />;
  };
}
