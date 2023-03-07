import { useContext, useState } from "react";
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
  const QuestionComponent = questionComponentMap[question.type];

  return (
    <div className=" w-full p-4 bg-white rounded-md shadow-md border-2 border-black">
      <h1 className="text-lg font-bold mb-4 font-serif">{question.text}</h1>
      <QuestionComponent question={question} />
    </div>
  );
}
