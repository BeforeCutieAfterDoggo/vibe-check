import React from "react";
import useQuestions from "../hooks/useQuestions";

const AIQuestionGenerator = () => {
  const [questions] = useQuestions();
  return <div>AIQuestionGenerator</div>;
};

export default AIQuestionGenerator;
