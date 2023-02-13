import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestore } from "../lib/firebase";

const useQuestions = () => {
  return useCollection(collection(firestore, "questions"));
};

export default useQuestions;
