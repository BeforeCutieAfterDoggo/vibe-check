import React, { useContext } from "react";
import { SessionContext } from "../../providers/SessionProvider";
import VisualCard from "./VisualCard";

const VisualCards = () => {
  const questions = [
    {
      type: "short-answer",
      question: "What is your name?",
      answers: [
        {
          value: "Lucy",
          count: 1,
        },
        {
          value: "Jmill",
          count: 1,
        },
        {
          value: "Bob",
          count: 1,
        },
        {
          value: "Sally",
          count: 1,
        },
      ],
    },
    {
      type: "multiple-choice",
      answers: [
        {
          choice: "Red",
          count: 2,
        },
        {
          choice: "Blue",
          count: 4,
        },
        {
          choice: "Green",
          count: 5,
        },
        {
          choice: "Yellow",
          count: 4,
        },
        {
          choice: "Purple",
          count: 2,
        },
      ],
      question: "What is your favorite color?",
    },
    {
      type: "scale",
      question: "How are you feeling today?",
      answers: [1, 2, 1, 3, 5, 3, 4, 3, 5],
      max: 5,
      min: 1,
    },
  ];
  const session = useContext(SessionContext);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 pb-10 sm:px-0">
      {session &&
        session.questions &&
        session.questions.map((question, idx) => (
          <div key={idx}>
            <VisualCard question={question} />
          </div>
        ))}
    </div>
  );
};

export default VisualCards;
