import error from "next/error";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import QuestionCard from "../../../components/Questions/QuestionCard";
import SubmitQuestion from "../../../components/Questions/SubmitQuestion";
import useSession from "../../../hooks/useSession";
import useUnansweredQuestions from "../../../hooks/useUnansweredQuestions";

export default function Home() {
  const router = useRouter();
  const [session] = useSession(router.query.session as string);
  const unansweredQuestions = useUnansweredQuestions(session);
  console.log(unansweredQuestions);

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4">
        <SubmitQuestion />
      </div>
      <ToastContainer />
    </div>
  );
}
