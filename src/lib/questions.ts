import { AnonymousUserContext } from "../providers/AnonymousUserProvider";
import { Question, Answer } from "../types";

export const getUnansweredQuestions = (
  userId?: string,
  questions?: Question[],
  answers?: Answer[]
) => {

  if (!questions || !answers || !userId) return [];

  const filteredAnswers = answers.filter((a) => a.userId === userId);
  const answeredQuestionIds = filteredAnswers.map((a) => a.questionId);
  const unansweredQuestions = questions
    .filter(
      (question) =>
        !answeredQuestionIds.includes(question.id) && question.id !== userId
    )
    .sort((a, b) => a.createdAt - b.createdAt);
  return unansweredQuestions;
};
