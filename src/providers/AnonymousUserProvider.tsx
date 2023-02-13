import { signInAnonymously, User } from "firebase/auth";
import { createContext, useState, useEffect, PropsWithChildren } from "react";
import { auth } from "../lib/firebase";

const AnonymousUserContext = createContext<User | null>(null);

const AnonymousUserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    signInAnonymously(auth).then((result) => {
      setUser(result.user);
    });
  }, []);

  return (
    <AnonymousUserContext.Provider value={user}>
      {children}
    </AnonymousUserContext.Provider>
  );
};

export { AnonymousUserContext, AnonymousUserProvider };
