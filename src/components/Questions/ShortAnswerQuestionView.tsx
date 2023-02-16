import { Checkbox, Input } from "antd";
import React from "react";
import { ShortAnswerQuestion } from "../../types";

const ScaleQuestionView = ({
  question,
  response,
  setResponse,
}: {
  question: ShortAnswerQuestion;
  response: any;
  setResponse: (response: any) => void;
}) => {
  const [text, setText] = React.useState("");

  const handleChange = (e: any) => {
    setText(e.target.value);
    setResponse({
      ...response,
      text: e.target.value,
    });
  };
  return <Input value={text} onChange={(e) => handleChange(e)} />;
};

export default ScaleQuestionView;
