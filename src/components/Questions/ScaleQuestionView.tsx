import { Checkbox, Input, Radio } from "antd";
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
      <p>Scale</p>
      <Radio.Group onChange={(e) => handleChange(e)}>
        {valueRange.map((option) => (
          <Radio key={option} value={option}>
            {option}
          </Radio>
        ))}
      </Radio.Group>
    </>
  );
};

export default ScaleQuestionView;
