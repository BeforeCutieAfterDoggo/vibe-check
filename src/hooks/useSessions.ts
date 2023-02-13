import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestore } from "../lib/firebase";

const useSessions = () => {
  return useCollection(collection(firestore, "sessions"));
};

export default useSessions;
