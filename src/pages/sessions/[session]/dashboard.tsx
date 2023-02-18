// pages/dashboard.tsx

import React from "react";
import VisualCard from "../../../components/Questions/VisualCard"
const Dashboard: React.FC = () => {
  const questions = [
    {
      type: "short-answer",
      question: "What is your name?",
      answers: [
        {
          value: 'Lucy',
          count: 1,
        },
        {
          value: 'Jmill',
          count: 1,
        },
        {
          value: 'Bob',
          count: 1,
        },
        {
          value: 'Sally',
          count: 1,
        },

      ],
    },
    {
      type: "multiple-choice",
      answers: [
        {
          "choice": "Red",
          "count": 2,
        },
        {
          "choice": "Blue",
          "count": 4,
        },
        {
          "choice": "Green",
          "count": 5,
        },
        {
          "choice": "Yellow",
          "count": 4,
        },
        {
          "choice": "Purple",
          "count": 2,
        },
      ],
      question: "What is your favorite color?",
    },
    {
      type: "scale",
      question: "How are you feeling today?",
      answers: [1, 2, 1, 3, 5, 3, 4, 3, 5],
      max: 5,
      min: 1
    },
  ];

  return (
    <div className="bg-[url('/images/bg.png')] bg-fixed bg-center bg-cover sm:h-screen">

      <div className="container mx-auto p-8">
        <div className=" mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-white text-5xl font-bold mb-8 underline decoration-wavy decoration-4 tracking-wide italic font-serif text-center">
            Vibeboard
          </h1>

        </div>
        <main className=" mx-auto  sm:px-6 lg:px-8 ">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 pb-10 sm:px-0">
            {questions.map((question, idx) => (
              <div key={idx}>
                <VisualCard question={question} />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
