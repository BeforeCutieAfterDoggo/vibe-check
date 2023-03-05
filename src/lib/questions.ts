import { AnonymousUserContext } from "../providers/AnonymousUserProvider";
import { Question, Answer } from "../types";

export const getUnansweredQuestions = (
  userId?: string,
  questions?: Question[],
) => {

  if (!questions || !userId) return [];
  let unansweredQuestionIds: any;
  if (questions) {
    unansweredQuestionIds = questions.filter(question => {
      if (question.answers) {
        return !question.answers.some(answer => answer.userId === userId);
      } else {
        return question
      }

    }).map(question => question.questionId);
  }
  const unansweredQuestions = questions
    .filter(
      (question) =>
        unansweredQuestionIds.includes(question.id)
    )
    .sort((a, b) => a.createdAt - b.createdAt);
  console.log("yoo", unansweredQuestions)
  return unansweredQuestions;
};
