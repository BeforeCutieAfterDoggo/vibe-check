import axios from "axios";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useContext, useState } from "react";
import { handleAxiosError } from "../lib/fetcher";
import { AnonymousUserContext } from "../providers/AnonymousUserProvider";

const QuestionCard = ({
  question,
}: {
  question: QueryDocumentSnapshot<DocumentData>;
}) => {
  const user = useContext(AnonymousUserContext);
  const [response, setResponse] = useState("");
  const submitAnswer = async (e:any) => {
    e.preventDefault();
    if (!user) return;
    try {
      const questionId = question.id;
      const userId = user.uid;
      await axios.post("/api/answer", {
        userId,
        questionId,
        response,
        skipped: false,
      });
      setResponse("");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const skipQuestion = async (e:any) => {
    e.preventDefault();
    if (!user) return;
    try {
      const questionId = question.id;
      const userId = user.uid;
      await axios.post("/api/answer", {
        userId,
        questionId,
        response: "",
        skipped: true,
      });
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-md shadow-md">
  <h3 className="text-lg font-bold mb-4">{question.data().text}</h3>
  <form className="flex items-center">
    <input
      className="flex-grow px-3 py-2 mr-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      type="text"
      value={response}
      onChange={(e) => setResponse(e.target.value)}
    />
    <button className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600" type="submit" onClick={(e) => submitAnswer(e)}>
      Submit
    </button>
    <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100" type="submit" onClick={(e) => skipQuestion(e)}>
      Skip
    </button>
  </form>
</div>

  );
};

export default QuestionCard;
