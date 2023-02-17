import axios from "axios";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useContext, useState } from "react";
import { handleAxiosError } from "../../lib/fetcher";
import { AnonymousUserContext } from "../../providers/AnonymousUserProvider";
import { QuestionType } from "../../types";
import MultipleChoiceVisual from "./MultipleChoiceVisual";
import ScaleVisual from "./ScaleVisual";
import ShortAnswerVisual from "./ShortAnswerVisual";

const questionComponentMap = {
    [QuestionType.SCALE]: ScaleVisual,
    [QuestionType.MULTIPLE_CHOICE]: MultipleChoiceVisual,
    [QuestionType.SHORT_ANSWER]: ShortAnswerVisual,
};

export default function VisualCard(props: any) {
    const question = props.question;
    console.log("yo", question);
    return (
        <div className="max-w-sm mx-auto p-4 bg-white rounded-md shadow-md border border-2 border-black">
            <h1 className="text-3xl font-bold mb-4 font-serif">{question.text}</h1>
            {questionComponentMap[question.type]({ question })}
        </div>
    );
};


