import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import AllQuestionsView from "../../../components/Questions/AllQuestionsView";
import SessionPage from "../../../components/Questions/SessionPage";
import SubmitQuestion from "../../../components/Questions/SubmitQuestion";
import { SessionProvider } from "../../../providers/SessionProvider";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className="bg-[url('/images/bg.png')] bg-fixed bg-center bg-cover">

        <SessionProvider sessionId={router.query.session as string}>
          <SessionPage />
        </SessionProvider>
      </div>
    </>
  );
}
