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
import { useContext } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../lib/firebase";
import { AnonymousUserContext } from "../providers/AnonymousUserProvider";
import { Answer } from "../types";

const postConverter: FirestoreDataConverter<Answer> = {
  toFirestore(question: WithFieldValue<Answer>): DocumentData {
    return { ...question };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Answer {
    const data = snapshot.data(options);
    return {
      ...data,
    } as Answer;
  },
};

const useAnswers = (sessionId: string) => {
  const q = query(
    collection(firestore, "answers"),
    where("sessionId", "==", sessionId || "xxxxxx")
  );
  return useCollectionData(q.withConverter(postConverter));
};

export default useAnswers;
