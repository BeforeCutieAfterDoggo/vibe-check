import { Checkbox, Input, Radio, Space } from "antd";
import React from "react";
import { ScaleQuestion } from "../../types";

const ScaleQuestionView = ({
  question,
  response,
  setResponse,
}: {
  question: ScaleQuestion;
  response: any;
  setResponse: (response: any) => void;
}) => {
  const valueRange = Array.from(
    { length: question.max - question.min + 1 },
    (_, i) => i + question.min
  );
  const handleChange = (e: any) => {
    setResponse({
      ...response,
      value: e.target.value,
    });
  };
  return (
    <>
      <div className="flex justify-center">
        <Radio.Group onChange={(e) => handleChange(e)}>

          {valueRange.map((option) => (
            <Radio key={option} value={option}>
              {option}
            </Radio>
          ))}
        </Radio.Group>
      </div>
      <div className="flex justify-between">
        {question.minLabel && <span className="mr-4 font-bold">{question.minLabel}</span>}
        {question.maxLabel && <span className="font-bold">{question.maxLabel}</span>}
      </div>

    </>
  );
};

export default ScaleQuestionView;
