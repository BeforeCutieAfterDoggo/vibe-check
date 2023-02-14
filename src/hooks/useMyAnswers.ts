import { collection, query, where } from "firebase/firestore";
import { useContext } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestore } from "../lib/firebase";
import { AnonymousUserContext } from "../providers/AnonymousUserProvider";

const useMyAnswers = () => {
  const user = useContext(AnonymousUserContext);
  const answersCollection = collection(firestore, "answers");
  const answersQuery = query(
    answersCollection,
    where("userId", "==", user ? user.uid : "")
  );
  return useCollection(answersQuery);
};

export default useMyAnswers;
