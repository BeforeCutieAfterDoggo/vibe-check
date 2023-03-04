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
    const fetchData = async () => {
      const q = query(
        collection(firestore, "questions"),
        where("sessionId", "==", sessionId || "xxxxxx")
      );
      const querySnapshot = await getDocs(q.withConverter(postConverter));
      const questionsData = querySnapshot.docs.map((doc) => doc.data());
      setQuestions(questionsData);
    };

    // Fetch data initially and every 5 seconds
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);


    // Cleanup the interval when component is unmounted
    return () => clearInterval(intervalId);
  }, [sessionId]);

  return questions;
};

export default useQuestions;
