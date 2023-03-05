import React, { useContext } from "react";
import { SessionContext } from "../../providers/SessionProvider";
import AISummary from "./AISummary";
import VisualCard from "./VisualCard";

const VisualCards = () => {
  const session = useContext(SessionContext);
  console.log("q",session?.questions)
  const filteredQuestions = session?.questions?.filter(q => q.text !== "");
  return (
    <>
      <div>
        <AISummary />
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 pb-10 sm:px-0"> */}

      <div className="columns-1 md:columns-2 lg:columns-3 ">      
      {session &&
          session.questions &&
          filteredQuestions?.map((question, idx) => (
            <div className="break-after-auto" key={idx}>
              <VisualCard question={question} />
            </div>
          ))}
      </div>
    </>
  );
};

export default VisualCards;
