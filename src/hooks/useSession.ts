import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../lib/firebase";

const useSession = (sessionId: string) => {
  return useDocumentData(doc(firestore, "sessions", sessionId));
};

export default useSession;
