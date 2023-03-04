import {
  collection,
  DocumentData,
  FirestoreDataConverter,
  orderBy,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  where,
  WithFieldValue,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../lib/firebase";
import { Question } from "../types";
import { useState, useEffect } from "react";
import { getDocs } from "firebase/firestore";
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
  const [questions, setQuestions] = useState<any>([]);

  useEffect(() => {
    const q = query(
      collection(firestore, "questions"),
      where("sessionId", "==", sessionId || "xxxxxx")
    );
    const unsubscribe = onSnapshot(q.withConverter(postConverter), (querySnapshot) => {
      const questionsData = querySnapshot.docs.map((doc) => doc.data());
      setQuestions(questionsData);
    });
    // Cleanup the listener when component is unmounted
    return () => unsubscribe();
  }, [sessionId]);

  return questions;
};


export default useQuestions;
