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
    <div className=" bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#7CEAA1] via-violet-600 to-sky-900 to-orange-300 min-h-screen ">
      <img
        src="/images/bg.png"
        alt="Background"
        className="absolute inset-0 z-0 w-full h-full object-cover blur-sm "
      />
      <header className=" border-b-2 ">

        <div className="relative max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-white text-5xl font-bold mb-8 underline decoration-wavy decoration-4 tracking-wide italic font-serif text-center">
            Vibeboard
          </h1>

        </div>
      </header>
      <main className="relative max-w-7xl mx-auto  sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 pb-10 sm:px-0">
          {questions.map((question, idx) => (
            <div key={idx}>
              <VisualCard question={question} />
            </div>
          ))}
        </div>
      </main>

    </div>
  );
};

export default Dashboard;
