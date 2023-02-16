import React from "react";
import { Session } from "../../types";
import QuestionCard from "./QuestionCard";

const AllQuestionsView = ({ session }: { session: Session }) => {
  console.log(session.questions);
  return (
    <>
      <h1>Questions</h1>
      {session.questions.map((question, idx) => (
        <div key={idx}>
          <QuestionCard question={question} />;
        </div>
      ))}
    </>
  );
};

export default AllQuestionsView;
