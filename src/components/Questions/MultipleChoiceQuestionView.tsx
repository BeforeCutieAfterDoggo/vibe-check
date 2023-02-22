import { Checkbox, Input, Space } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import React from "react";
import { MultipleChoiceQuestion } from "../../types";

const MultipleChoiceQuestionView = ({
  question,
  response,
  setResponse,
}: {
  question: MultipleChoiceQuestion;
  response: any;
  setResponse: (response: any) => void;
}) => {
  const [otherText, setOtherText] = React.useState("");
  const [otherChecked, setOtherChecked] = React.useState(false);
  const handleChange = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
    setResponse({
      ...response,
      options: checkedValues,
    });
  };

  const handleOtherChange = (e: any) => {
    console.log("here", e.target.value);
    setOtherChecked(e.target.value !== "");
    setOtherText(e.target.value);
    setResponse({
      ...response,
      other: e.target.value,
    });

  };
  return (
    <>
      <Checkbox.Group onChange={handleChange}>
        <Space direction="vertical">
          {question.options.map((option: any, idx) => (
            <Checkbox value={option} key={idx}>
              {option}
            </Checkbox>
          ))}
        </Space>
      </Checkbox.Group>

      {question.allowOther && (
        <div>
          <Checkbox value="other" checked={otherChecked}>
            Other
          </Checkbox>
          <Input value={otherText} onChange={(e) => handleOtherChange(e)} />
        </div>
      )}
    </>
  );
};

export default MultipleChoiceQuestionView;
