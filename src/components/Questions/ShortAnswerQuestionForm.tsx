import { Button, Input } from "antd";
import axios from "axios";
import React, { useContext } from "react";
import { handleAxiosError } from "../../lib/fetcher";
import { SessionContext } from "../../providers/SessionProvider";
import { QuestionType } from "../../types";

export default function ShortAnswerQuestionForm() {
  const sessionInfo = useContext(SessionContext);
  const [questionText, setQuestionText] = React.useState("");

  const handleSubmit = async (e: any) => {
    if (!sessionInfo) return;
    e.preventDefault();
    try {
      await axios.post("/api/question", {
        sessionId: sessionInfo.session?.id,
        type: QuestionType.SHORT_ANSWER,
        text: questionText,
        
      });
      setQuestionText("");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <div>
      <label htmlFor="">Question text:</label>
      <Input
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />
      <Button
        className="mt-2 bg-black text-white"
        onClick={handleSubmit}
        disabled={!questionText}
      >
        Submit
      </Button>
    </div>
  );
}
