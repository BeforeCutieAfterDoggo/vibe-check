import {
  collection,
  DocumentData,
  FirestoreDataConverter,
  getDocs,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  where,
  WithFieldValue,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
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
  const [answers, setAnswers] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(firestore, "answers"),
        where("sessionId", "==", sessionId || "xxxxxx")
      );
      const querySnapshot = await getDocs(q.withConverter(postConverter));
      const answersData = querySnapshot.docs.map((doc) => doc.data());
      setAnswers(answersData);
    };
    // Fetch data initially and every 5 seconds
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    // Cleanup the interval when component is unmounted
    return () => clearInterval(intervalId);
  }, [sessionId]);

  return answers;
};

export default useAnswers;
