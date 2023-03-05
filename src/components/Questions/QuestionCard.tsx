import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { handleAxiosError } from "../../lib/fetcher";
import { AnonymousUserContext } from "../../providers/AnonymousUserProvider";
import { QuestionType } from "../../types";
import MultipleChoiceQuestion from "./MultipleChoiceQuestionView";
import ScaleQuestion from "./ScaleQuestionView";
import ShortAnswerQuestion from "./ShortAnswerQuestionView";
const questionComponentMap = {
  [QuestionType.SCALE]: ScaleQuestion,
  [QuestionType.MULTIPLE_CHOICE]: MultipleChoiceQuestion,
  [QuestionType.SHORT_ANSWER]: ShortAnswerQuestion,
};

const QuestionCard = ({
  question,
}: {
  question: any;
}) => {
  const user = useContext(AnonymousUserContext);
  const [response, setResponse] = useState({});
  const submitAnswer = async (e: any) => {
    e.preventDefault();
    if (!user) return;
    try {
      const questionId = question.id;
      const userId = user.uid;
      await axios.post("/api/answer", {
        userId,
        questionId,
        sessionId: question.sessionId,
        response,
        skipped: false,
      });
      setResponse("");
    } catch (error) {
      handleAxiosError(error);
    }
  };
  // useEffect(() => {
  // }, [response]);

  const skipQuestion = async (e: any) => {
    e.preventDefault();
    if (!user) return;
    try {
      const questionId = question.id;
      const userId = user.uid;
      await axios.post("/api/answer", {
        userId,
        questionId,
        sessionId: question.sessionId,
        response: {},
        skipped: true,
      });
    } catch (error) {
      handleAxiosError(error);
    }
  };
  const QuestionComponent = questionComponentMap[question.type as QuestionType];

  return (
    // <></>
    <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md border border-2 border-black">
      <h1 className="text-3xl font-bold mb-4 font-serif">{question.text}</h1>
      <QuestionComponent
        question={question as never}
        response={response}
        setResponse={setResponse}
      />

      <div className="flex items-center justify-between mt-4">
        <button
          className="px-4 py-2 text-gray-700 border border-2 border-black rounded-md shadow-sm hover:bg-gray-100"
          type="submit"
          onClick={(e) => skipQuestion(e)}
        >
          Skip
        </button>
        <button
          className="px-4 py-2 text-white bg-black border border-2 border-black rounded-md shadow-sm hover:text-black hover:bg-[#5BFF33]"
          type="submit"
          onClick={(e) => submitAnswer(e)}
          disabled={Object.keys(response).length === 0}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
