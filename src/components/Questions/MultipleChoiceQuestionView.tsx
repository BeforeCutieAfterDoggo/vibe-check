import { Checkbox, Input } from "antd";
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
    setResponse({
      ...response,
      options: checkedValues,
    });
  };

  const handleOtherChange = (e: any) => {
    setOtherChecked(e.target.value !== "");
    setOtherText(e.target.value);
    setResponse({
      ...response,
      other: e.target.value,
    });
  };
  return (
    <>
      <Checkbox.Group options={question.options} onChange={handleChange} />
      {question.allowOther && (
        <div>
          <Checkbox value="other" checked={otherText !== ""}>
            Other
          </Checkbox>
          <Input value={otherText} onChange={(e) => handleOtherChange(e)} />
        </div>
      )}
    </>
  );
};

export default MultipleChoiceQuestionView;
