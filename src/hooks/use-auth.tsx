import {
  deleteCurrentSession,
  getCurrentSession,
  logIn,
  verifySession,
  VerifySessionOptions,
} from "@/lib/auth";
import { Models } from "appwrite";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface LiveBeatAuthContext {
  session?: Models.Session;
  logOut: Function;
  logIn: Function;
  verifySession: Function;
}

export const AuthContext = createContext<LiveBeatAuthContext | undefined>(
  undefined
);

interface AuthProviderProps {
  children?: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuthState();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export function useAuthState() {
  const [session, setSession] = useState<Models.Session>();

  useEffect(() => {
    (async function run() {
      const data = await getCurrentSession();
      setSession(data.session);
    })();
  }, []);

  async function logOut() {
    await deleteCurrentSession();
    setSession(undefined);
  }

  async function verifySessionAndSave(options: VerifySessionOptions) {
    const data = await verifySession(options);
    setSession(data);
  }

  return { session, logOut, logIn, verifySession: verifySessionAndSave };
}

export function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth can not be used outside useContext");
  }

  return auth;
}
