import axios from "axios";
import React from "react";
import SubmitQuestion from "../components/SubmitQuestion";
import useSession from "../hooks/useSession";
import { handleAxiosError } from "../lib/fetcher";

const TestPage = () => {
  const handleSeed = async () => {
    try {
      await axios.get("/api/seed");
    } catch (error) {
      handleAxiosError(error);
    }
  };
  const testSessionId = "vcr2hIUm5SNwYrMP8yDz";
  const [session] = useSession(testSessionId);
  console.log(session);
  return (
    <div>
      <h1>Test Page</h1>
      <button onClick={handleSeed}>Seed DB</button>
      <SubmitQuestion />
    </div>
  );
};

export default TestPage;
