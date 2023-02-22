import {
  collection,
  DocumentData,
  FirestoreDataConverter,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  where,
  WithFieldValue,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../lib/firebase";
import { Question } from "../types";

const postConverter: FirestoreDataConverter<Question> = {
  toFirestore(question: WithFieldValue<Question>): DocumentData {
    return { ...question };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Question {
    const data = snapshot.data(options);
    return {
      ...data,
      id: snapshot.id,
    } as Question;
  },
};

const useQuestions = (sessionId: string) => {
  // Get all questions where sessionId === sessionId
  const q = query(
    collection(firestore, "questions"),
    where("sessionId", "==", sessionId || "xxxxxx")
  );
  return useCollectionData(q.withConverter(postConverter));
};

export default useQuestions;
