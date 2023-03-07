import { Button, Input } from "antd";
import axios from "axios";
import React, { useContext } from "react";
import { handleAxiosError } from "../../lib/fetcher";
import { SessionContext } from "../../providers/SessionProvider";
import { QuestionType } from "../../types";

const ScaleQuestionForm = () => {
  const sessionInfo = useContext(SessionContext);

  const [questionText, setQuestionText] = React.useState("");
  const [minLabel, setMinLabel] = React.useState("");
  const [maxLabel, setMaxLabel] = React.useState("");

  const handleSubmit = async (e: any) => {
    if (!sessionInfo) return;
    e.preventDefault();
    try {
      await axios.post("/api/question", {
        sessionId: sessionInfo.session?.id,
        type: QuestionType.SCALE,
        text: questionText,
        min: 1,
        max: 5,
        step: 1,
        minLabel,
        maxLabel,
      });
      setQuestionText("");
      setMaxLabel("");
      setMinLabel("");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <>
      <div>
        <label htmlFor="">Question text:</label>
        <Input
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        <label htmlFor="minLabel">Min Label</label>
        <Input
          id="minLabel"
          value={minLabel}
          onChange={(e) => setMinLabel(e.target.value)}
        />
        <label htmlFor="maxLabel">Max Label</label>
        <Input
          id="maxLabel"
          value={maxLabel}
          onChange={(e) => setMaxLabel(e.target.value)}
        />
        <Button
          className="mt-2 bg-black text-white"
          onClick={handleSubmit}
          disabled={!questionText}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default ScaleQuestionForm;
