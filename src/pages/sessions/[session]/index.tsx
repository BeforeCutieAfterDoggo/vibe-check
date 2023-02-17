import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import AllQuestionsView from "../../../components/Questions/AllQuestionsView";
import SubmitQuestion from "../../../components/Questions/SubmitQuestion";
import { SessionProvider } from "../../../providers/SessionProvider";

export default function Home() {
  const router = useRouter();

  return (
    <SessionProvider sessionId={router.query.session as string}>
      <AllQuestionsView />
      <div className="flex flex-col h-screen">
        <div className="p-4">
          <SubmitQuestion />
        </div>
        <ToastContainer />
      </div>
    </SessionProvider>
  );
}
