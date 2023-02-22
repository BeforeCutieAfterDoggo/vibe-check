import axios from "axios";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useContext, useState } from "react";
import { handleAxiosError } from "../../lib/fetcher";
import { AnonymousUserContext } from "../../providers/AnonymousUserProvider";
import { SessionContext } from "../../providers/SessionProvider";
import { Question, QuestionType } from "../../types";
import MultipleChoiceVisual from "./MultipleChoiceVisual";
import ScaleVisual from "./ScaleVisual";
import ShortAnswerVisual from "./ShortAnswerVisual";

const questionComponentMap = {
  [QuestionType.SCALE]: ScaleVisual,
  [QuestionType.MULTIPLE_CHOICE]: MultipleChoiceVisual,
  [QuestionType.SHORT_ANSWER]: ShortAnswerVisual,
};

export default function VisualCard({ question }: { question: Question }) {
  const session = useContext(SessionContext);
  const answers = session?.answers.filter(
    (answer) => answer.questionId === question.id
  );
  console.log("answers", answers);

  console.log("yo", question);
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-md shadow-md border-2 border-black">
      <h1 className="text-lg font-bold mb-4 font-serif">{question.text}</h1>
      {/* {questionComponentMap[question.type]({ question })} */}
    </div>
  );
}
