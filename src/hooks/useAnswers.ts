import { collection, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../lib/firebase";

const useQuestions = (sessionId: string) => {
  // Get all questions where sessionId === sessionId
  const q = query(
    collection(firestore, "answers"),
    where("sessionId", "==", sessionId || "xxxxxx")
  );
  return useCollectionData(q);
};

export default useQuestions;
