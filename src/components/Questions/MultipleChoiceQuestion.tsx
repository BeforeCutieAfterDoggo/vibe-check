import { Checkbox, Input } from "antd";
import React from "react";
import { MultipleChoiceQuestion } from "../../types";

const MultipleChoiceQuestion = ({
  question,
}: {
  question: MultipleChoiceQuestion;
}) => {
  return (
    <>
      <div>{question.text}</div>
      <Checkbox.Group options={question.options} />
      {question.allowOther && (
        <div>
          <Checkbox value="other">Other</Checkbox>
          <Input />
        </div>
      )}
    </>
  );
};

export default MultipleChoiceQuestion;
