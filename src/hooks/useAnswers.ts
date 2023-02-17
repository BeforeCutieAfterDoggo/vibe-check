import { collection, query, where } from "firebase/firestore";
import { useContext } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../lib/firebase";
import { AnonymousUserContext } from "../providers/AnonymousUserProvider";

const useAnswers = (sessionId: string) => {
  const user = useContext(AnonymousUserContext);
  const q = query(
    collection(firestore, "answers"),
    where("sessionId", "==", sessionId || "xxxxxx"),
    where("userId", "==", user?.uid || "xxxxxx")
  );
  return useCollectionData(q);
};

export default useAnswers;
