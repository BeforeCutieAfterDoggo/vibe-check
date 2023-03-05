import { createContext, PropsWithChildren } from "react";
import { Session, Question, Answer } from "../types";
import useSession from "../hooks/useSession";
import useQuestions from "../hooks/useQuestions";

interface SessionContextType {
  sessionId: string;
  session?: Session;
  questions?: Question[];
  answers?: Answer[];
}

const SessionContext = createContext<SessionContextType | null>(null);

const SessionProvider = ({
  sessionId,
  children,
}: PropsWithChildren<{ sessionId: string }>) => {
  const [session] = useSession(sessionId);
  const questions = useQuestions(session?.id as string) || [];
  return (
    <SessionContext.Provider
      value={{
        sessionId,
        session,
        questions,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
