import { useRouter } from "next/router";
import React from "react";
import AllQuestionsView from "../../../components/Questions/AllQuestionsView";
import SessionAdminControls from "../../../components/SessionAdminControls";
import useSession from "../../../hooks/useSession";

const SessionAdminPage = () => {
  const router = useRouter();
  const [session, loading] = useSession(router.query.session as string);
  console.log(session);
  if (loading) return <div>Loading...</div>;
  return (
    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 ">
      {session && (
        <>
          {/* <SessionAdminControls session={session} /> */}
          <AllQuestionsView session={session} />
        </>
      )}
    </div>
  );
};

export default SessionAdminPage;
