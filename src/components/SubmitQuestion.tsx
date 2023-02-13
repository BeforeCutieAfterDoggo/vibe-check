import { useState } from "react";
import axios from "axios";
import { handleAxiosError } from "../lib/fetcher";

const SubmitQuestion = () => {
  const [text, setText] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("/api/question", { text });
      setText("");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-4">Submit a Question</h1>
      <form className="flex items-center">
        <input
          className="flex-grow px-3 py-2 mr-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>

  );
};

export default SubmitQuestion;
