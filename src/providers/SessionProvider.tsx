import { createContext, PropsWithChildren } from "react";
import { Session, Question, Answer } from "../types";
import useSession from "../hooks/useSession";
import useQuestions from "../hooks/useQuestions";
import useAnswers from "../hooks/useAnswers";

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
  const [questions] = useQuestions(session?.id as string);
  const [answers] = useAnswers(session?.id as string);
  console.log("allAnswers111", answers);

  return (
    <SessionContext.Provider
      value={{
        sessionId,
        session,
        questions,
        answers,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
