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
      <Radio.Group onChange={(e) => handleChange(e)}>
        {valueRange.map((option) => (
          <Radio key={option} value={option}>
            {option}
          </Radio>
        ))}
      </Radio.Group>
      <br />
      <Space>
        {question.minLabel && <span>{question.minLabel}</span>}
        {question.maxLabel && <span>{question.maxLabel}</span>}
      </Space>
    </>
  );
};

export default ScaleQuestionView;
