import { Button } from "antd";
import axios from "axios";
import React, { useContext } from "react";
import { handleAxiosError } from "../../lib/fetcher";
import { SessionContext } from "../../providers/SessionProvider";

const AISummary = () => {
  const session = useContext(SessionContext);
  const { questions, answers } = session || {};
  const [generatingSummary, setGeneratingSummary] = React.useState(false);
  const [summary, setSummary] = React.useState("");

  const generateSummary = async () => {
    setGeneratingSummary(true);
    try {
      if (!questions || !answers) return;
      console.log("generate summary");
      console.log("questions", questions);
      console.log("answers", answers);
      const response = await axios.post("/api/summary", {
        questions,
        answers,
      });
      console.log(response);
      setSummary(response.data.summary);
    } catch (error) {
      handleAxiosError(error);
    }
    setGeneratingSummary(false);
  };

  return (
    <div className="mx-auto p-4 bg-white rounded-md shadow-md border-2 border-black">
      <h1 className="text-lg font-bold mb-4 font-serif">AI Summary</h1>
      <div
        style={{
          whiteSpace: "pre-wrap",
        }}
      >
        {summary}
      </div>
      <Button
        className="mt-2 bg-black text-white"
        onClick={generateSummary}
        loading={generatingSummary}
      >
        Generate Summary
      </Button>
    </div>
  );
};

export default AISummary;
