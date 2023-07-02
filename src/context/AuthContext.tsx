import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  ReactNode,
} from "react";
import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

interface Props {
  children?: ReactNode;
}

interface AuthContextInterface {
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  user: User | null;
  loading: boolean;
}

export const authContext = createContext<AuthContextInterface | null>(null);

export function useAuth() {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("CONTEXT NOT FOUND");
  }
  return context;
}

const AuthProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  async function register(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function signout() {
    await signOut(auth);
  }

  return (
    <authContext.Provider value={{ register, login, signout, user, loading }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
