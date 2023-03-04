import React, { useContext } from "react";
import { getUnansweredQuestions } from "../../lib/questions";
import { AnonymousUserContext } from "../../providers/AnonymousUserProvider";
import { SessionContext } from "../../providers/SessionProvider";
import QuestionCard from "./QuestionCard";

const AllQuestionsView = () => {
  const user = useContext(AnonymousUserContext);
  const session = useContext(SessionContext);
  console.log("user", user?.uid, session?.questions, session?.answers);

  console.log("ses111", session);
  const unansweredQuestions =
    session &&
    getUnansweredQuestions(user?.uid, session.questions, session.answers);
  console.log("unansweredQuestions", unansweredQuestions);
  console.log("ses222", unansweredQuestions);
  return (
    <>
      <h1 className="text-center text-white italic underline decoration-wavy decoration-4 tracking-wide font-bold  text-3xl font-serif py-10 ">
        Questions
      </h1>
      {unansweredQuestions &&
        unansweredQuestions.map((question, idx) => (
          <div key={idx}>
            <QuestionCard question={question} />;
          </div>
        ))}
    </>
  );
};

export default AllQuestionsView;
