import { ToastContainer } from "react-toastify";
import QuestionCard from "../../components/QuestionCard";
import SubmitQuestion from "../../components/SubmitQuestion";
import useQuestions from "../../hooks/useQuestions";
import useMyAnswers from "../../hooks/useUnansweredQuestions";

export default function Home() {
  const [questions, loading, error] = useQuestions();
  const [myAnswers] = useMyAnswers();
  console.log(myAnswers && myAnswers.docs.map((doc) => doc.data()));
  const unansweredQuestions = questions?.docs.filter(
    (question) =>
      !myAnswers?.docs.find(
        (answer) => answer.data().questionId === question.id
      )
  );

  return (
<div className="flex flex-col h-screen">
  <div className="flex-1">
    {loading && <div>Loading...</div>}
    {error && <>Error: {error}</>}
    {unansweredQuestions && (
      <div>
        {unansweredQuestions.map((doc) => (
          <QuestionCard key={doc.id} question={doc} />
        ))}
      </div>
    )}
  </div>
  <div className="p-4">
    <SubmitQuestion />
  </div>
  <ToastContainer />
</div>

  );
}
