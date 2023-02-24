import React, { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import { SessionContext } from "../../providers/SessionProvider";
import AllQuestionsView from "./AllQuestionsView";
import SessionPasswordInput from "./SessionPasswordInput";
import SubmitQuestion from "./SubmitQuestion";

const SessionPage = () => {
  const [allowed, setAllowed] = useState(false);
  const session = useContext(SessionContext);

  if (!session?.session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      {session.session?.password &&
      session.session.password == "" &&
      !allowed ? (
        <SessionPasswordInput setAllowed={setAllowed} />
      ) : (
        <>
          <div className="p-4">
            <SubmitQuestion />
          </div>
          <AllQuestionsView />
        </>
      )}
      <div className="flex flex-col h-screen">
        <ToastContainer />
      </div>
    </div>
  );
};

export default SessionPage;
