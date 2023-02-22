import {
  doc,
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../lib/firebase";
import { Session } from "../types";

const postConverter: FirestoreDataConverter<Session> = {
  toFirestore(session: WithFieldValue<Session>): DocumentData {
    return { ...session };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Session {
    const data = snapshot.data(options);
    return {
      ...data,
      id: snapshot.id,
    } as Session;
  },
};

const useSession = (sessionId?: string) => {
  const ses = sessionId || "x";
  return useDocumentData(
    doc(firestore, "sessions", ses).withConverter(postConverter)
  );
};

export default useSession;
