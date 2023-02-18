import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import AllQuestionsView from "../../../components/Questions/AllQuestionsView";
import SubmitQuestion from "../../../components/Questions/SubmitQuestion";
import { SessionProvider } from "../../../providers/SessionProvider";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className="bg-[url('/images/bg.png')] bg-fixed bg-center bg-cover">

        <SessionProvider sessionId={router.query.session as string}>
          {/* <img
          src="/images/bg.png"
          alt="Background"
          className="absolute inset-0 z-0 w-full h-full object-cover blur-sm "
        /> */}
          <div className="relative">
            <div className="p-4">
              <SubmitQuestion />
            </div>
            <AllQuestionsView />

            <div className="flex flex-col h-screen">

              <ToastContainer />
            </div>
          </div>
        </SessionProvider>
      </div>
    </>
  );
}
