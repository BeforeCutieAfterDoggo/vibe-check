import { Question, Answer } from "../types";

export const getUnansweredQuestions = (
  questions?: Question[],
  answers?: Answer[]
) => {
  if (!questions || !answers) return [];
  const answeredQuestionIds = answers.map((a) => a.questionId);
  const unansweredQuestions = questions.filter(
    (question) => !answeredQuestionIds.includes(question.id)
  );
  return unansweredQuestions;
};
