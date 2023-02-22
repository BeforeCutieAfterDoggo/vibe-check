
import axios from "axios";
import { handleAxiosError } from "../../lib/fetcher";
import { QuestionType } from "../../types";
import { Select } from "antd";
import MultipleChoiceQuestionForm from "./MultipleChoiceQuestionForm";
import ScaleQuestionForm from "./ScaleQuestionForm";
import ShortAnswerQuestionForm from "./ShortAnswerQuestionForm";
import Link from "next/link";
import { useContext, useState } from "react";
import { useRouter } from 'next/router';
const questionTypeLabelMap = {
  [QuestionType.SCALE]: "Scale",
  [QuestionType.MULTIPLE_CHOICE]: "Multiple Choice",
  [QuestionType.SHORT_ANSWER]: "Short Answer",
};

const questionTypeComponentMap = {
  [QuestionType.SCALE]: <ScaleQuestionForm />,
  [QuestionType.MULTIPLE_CHOICE]: <MultipleChoiceQuestionForm />,
  [QuestionType.SHORT_ANSWER]: <ShortAnswerQuestionForm />
};

const SubmitQuestion = () => {
  const [questionType, setQuestionType] = useState<QuestionType>(
    QuestionType.SHORT_ANSWER
  );
  const router = useRouter();
  const link = router.asPath;
  console.log("dynamicParam", link)


  return (
    <>
      <h1 className="text-center text-white italic underline decoration-wavy decoration-4 tracking-wide font-bold  text-3xl font-serif py-10 ">
        Submit a Question</h1>
      <div className="flex justify-center mb-10">
        <Link href={`/${link}/dashboard`}>
          <button className="bg-black text-white font-bold py-2 px-4 font-serif rounded-full mr-4">View VibeBoard </button>
        </Link>
        <Link href={`/`}>
          <button className="bg-black text-white font-bold py-2 px-4 font-serif rounded-full">Home</button>
        </Link>
      </div>
      <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
        <Select value={questionType} onChange={setQuestionType}>
          {Object.values(QuestionType).map((type, idx) => (
            <Select.Option value={type} key={idx}>
              {questionTypeLabelMap[type]}
            </Select.Option>
          ))}
        </Select>
        {questionTypeComponentMap[questionType]}
      </div>
    </>
  );
};

export default SubmitQuestion;
