import React, { useContext } from "react";
import { getUnansweredQuestions } from "../../lib/questions";
import { AnonymousUserContext } from "../../providers/AnonymousUserProvider";
import { SessionContext } from "../../providers/SessionProvider";
import QuestionCard from "./QuestionCard";

const AllQuestionsView = () => {
  const user = useContext(AnonymousUserContext);
  const session = useContext(SessionContext);
  const unansweredQuestions =
    session &&
    getUnansweredQuestions(user?.uid, session.questions);

  return (
    <>
      <h1 className="text-center text-white italic underline decoration-wavy decoration-4 tracking-wide font-bold  text-3xl font-serif py-10 ">
        Questions
      </h1>
      <div className="flex flex-col justify-center">
        {unansweredQuestions &&
          unansweredQuestions.map((question, idx) => (
            <div key={idx}>
              <QuestionCard question={question} />;
            </div>
          ))}
      </div>
    </>
  );
};

export default AllQuestionsView;
