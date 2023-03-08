import React, { useContext } from "react";
import { SessionContext } from "../../providers/SessionProvider";
import AISummary from "./AISummary";
import VisualCard from "./VisualCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
const VisualCards = () => {
  const session = useContext(SessionContext);
  const filteredQuestions = session?.questions?.filter(q => q.text !== "");
  return (
    <>
      <div>
        <AISummary />
      </div>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 640: 1, 768: 2, 1024: 3 }}
      >
        <Masonry gutter="10px">
          {session &&
            session.questions &&
            filteredQuestions?.map((question, idx) => (
              <div  key={idx}>
                <VisualCard question={question} />
              </div>
            ))}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
};

export default VisualCards;
