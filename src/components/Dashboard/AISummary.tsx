import { Button, Input, Space } from "antd";
import axios from "axios";
import React, { useContext } from "react";
import { handleAxiosError } from "../../lib/fetcher";
import { JudgePersonality } from "../../pages/api/summary";
import { SessionContext } from "../../providers/SessionProvider";

const AISummary = () => {
  const session = useContext(SessionContext);
  const { questions, answers } = session || {};
  const [generatingSummary, setGeneratingSummary] = React.useState(false);
  const [summary, setSummary] = React.useState("");
  const [apiKey, setApiKey] = React.useState("");

  const generateSummary = async (personalityType: JudgePersonality) => {
    setGeneratingSummary(true);
    try {
      if (!questions || !answers) return;
      const response = await axios.post("/api/summary", {
        questions,
        answers,
        personalityType,
        apiKey,
      });
      setSummary(response.data.summary);
    } catch (error) {
      handleAxiosError(error);
    }
    setGeneratingSummary(false);
  };

  return (
    <div className="mb-6 mx-auto p-4 bg-white rounded-md shadow-md border-2 border-black">
      <h1 className="text-lg font-bold mb-4 font-serif">AI Summary</h1>
      <div
        style={{
          whiteSpace: "pre-wrap",
        }}
      >
        {summary}
      </div>
      <label className="mt-2">OpenAI API Key</label>
      <Input
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        type="password"
      />
      <div className="flex justify-center md:gap-x-4 lg:gap-x-10  flex-col md:flex-row">
        <Button
          className="mt-2  bg-black text-white"
          onClick={() => generateSummary("perky")}
          loading={generatingSummary}
        >
          Generate Perky Summary
        </Button>
        <Button
          className="mt-2 bg-black text-white"
          onClick={() => generateSummary("cool")}
          loading={generatingSummary}
        >
          Generate Cool Summary
        </Button>
        <Button
          className="mt-2 bg-black text-white"
          onClick={() => generateSummary("snarky")}
          loading={generatingSummary}
        >
          Generate Snarky Summary
        </Button>
      </div>
    </div>
  );
};

export default AISummary;
