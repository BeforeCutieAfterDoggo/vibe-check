import React from "react";
import ScaleModal from "./ScaleModal";
const ScaleVisual = ({ question }: { question: any }) => {
  let answers = []
  if (question?.answers) {
    answers = question?.answers;
  }
  const responses = answers.map((answer: any) => answer.response).map((obj: any) => obj.value)
  const filteredResponse = responses?.filter((item: any) => item !== undefined);
  const maxLabel = question?.maxLabel;
  const minLabel = question?.minLabel;

  const detailedAnswers = filteredResponse?.reduce((accumulator: any, currentValue: any) => {
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

  const average =
    filteredResponse?.reduce((a: any, b: any) => a + b, 0) / filteredResponse?.length! / 5;

  return (
    <>
      <div className="h-60">
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
