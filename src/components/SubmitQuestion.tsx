import { useState } from "react";
import axios from "axios";
import { handleAxiosError } from "../lib/fetcher";
import { QuestionType } from "../types";
import { Select } from "antd";

const ScaleQuestionForm = () => {
  return <div>ScaleQuestionForm</div>;
};

const MultipleChoiceQuestionForm = () => {
  return <div>MultipleChoiceQuestionForm</div>;
};

const ShortAnswerQuestionForm = () => {
  return <div>ShortAnswerQuestionForm</div>;
};

const questionTypeLabelMap = {
  [QuestionType.SCALE]: "Scale",
  [QuestionType.MULTIPLE_CHOICE]: "Multiple Choice",
  [QuestionType.SHORT_ANSWER]: "Short Answer",
};

const questionTypeComponentMap = {
  [QuestionType.SCALE]: ScaleQuestionForm,
  [QuestionType.MULTIPLE_CHOICE]: MultipleChoiceQuestionForm,
  [QuestionType.SHORT_ANSWER]: ShortAnswerQuestionForm,
};

const SubmitQuestion = () => {
  const [text, setText] = useState("");
  const [questionType, setQuestionType] = useState<QuestionType>(
    QuestionType.SHORT_ANSWER
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("/api/question", { text });
      setText("");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-4">Submit a Question</h1>
      <form onSubmit={handleSubmit}>
        <Select value={questionType} onChange={setQuestionType}>
          {Object.values(QuestionType).map((type, idx) => (
            <Select.Option value={type} key={idx}>
              {questionTypeLabelMap[type]}
            </Select.Option>
          ))}
        </Select>
        {questionTypeComponentMap[questionType]()}
      </form>
    </div>
  );
};

export default SubmitQuestion;
