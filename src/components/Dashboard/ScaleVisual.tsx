import React from "react";
import { Progress } from "antd";
import { useContext, useState } from "react";
import { SessionContext } from "../../providers/SessionProvider";
import ScaleModal from "./ScaleModal";
const ScaleVisual = ({ question }: { question: any }) => {
  const session = useContext(SessionContext);
  const answers = session?.answers?.filter(
    (answer) => answer.questionId === question.id && !answer.skipped
  );
  const response = answers?.map((answer) => answer.response.value);
  const maxLabel = question?.maxLabel;
  const minLabel = question?.minLabel;

  console.log("Scale", maxLabel, minLabel);

  const detailedAnswers = response?.reduce((accumulator, currentValue) => {
    const existingItem = accumulator.find(
      (item: any) => item.choice === currentValue
    );
    if (existingItem) {
      existingItem.count++;
    } else {
      accumulator.push({ choice: currentValue, count: 1 });
    }
    return accumulator;
  }, []);
  console.log("detailedAnswers", detailedAnswers);

  const average =
    response?.reduce((a: any, b: any) => a + b, 0) / response?.length! / 5;
  console.log("average", average);

  return (
    <>
      <div className="h-60">
        <p className="font-serif font-bold text-center">{question.question}</p>
        <div className="flex h-3/4 justify-center items-center mx-1 flex-col">
          <div className="flex justify-center w-full">
            <div className="flex">
              <p className="font-mono text-5xl">
                {parseFloat((average * 5).toFixed(2))}
              </p>
              /5
            </div>
          </div>
          <div className="flex justify-between">
            {minLabel && <span className="mr-4 font-bold">{minLabel}</span>}
            {maxLabel && <span className="font-bold">{maxLabel}</span>}
          </div>
        </div>
        <div className="flex justify-center">
          <ScaleModal data={detailedAnswers} />
        </div>
      </div>
    </>
  );
};

export default ScaleVisual;
