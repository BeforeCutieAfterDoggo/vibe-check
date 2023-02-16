import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../lib/firebase";

const useSession = (sessionId?: string) => {
  const ses = sessionId || "x";
  return useDocumentData(doc(firestore, "sessions", ses));
};

export default useSession;
