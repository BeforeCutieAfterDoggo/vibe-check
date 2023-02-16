import { useContext } from "react";
import { AnonymousUserContext } from "../providers/AnonymousUserProvider";
import { Session } from "../types";

const useUnansweredQuestions = (session: Session | null) => {
  const user = useContext(AnonymousUserContext);
  if (!session) return [];
  const answeredQuestions = session.answers[user?.uid || ""] || [];
  const answeredQuestionIds = answeredQuestions.map((a) => a.questionId);
  const unansweredQuestions = session.questions.filter(
    (question) => !answeredQuestionIds.includes(question.id)
  );
  return unansweredQuestions;
};

export default useUnansweredQuestions;
