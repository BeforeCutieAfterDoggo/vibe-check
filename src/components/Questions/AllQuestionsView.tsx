import React, { useContext } from "react";
import { SessionContext } from "../../providers/SessionProvider";
import QuestionCard from "./QuestionCard";

const AllQuestionsView = () => {
  const session = useContext(SessionContext);
  console.log(session);
  return (
    <>
      <h1 className="text-center font-bold  text-3xl font-serif py-10 ">
        Questions
      </h1>
      {session &&
        session.questions &&
        session.questions.map((question, idx) => (
          <div key={idx}>
            <QuestionCard question={question} />;
          </div>
        ))}
    </>
  );
};

export default AllQuestionsView;
