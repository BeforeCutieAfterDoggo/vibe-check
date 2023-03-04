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
  onSnapshot
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

// const useAnswers = (sessionId: string) => {
//   const [answers, setAnswers] = useState<any>([]);

// useEffect(() => {
//   const fetchData = async () => {
//     const q = query(
//       collection(firestore, "answers"),
//       where("sessionId", "==", sessionId || "xxxxxx")
//     );
//     const querySnapshot = await getDocs(q.withConverter(postConverter));
//     const answersData = querySnapshot.docs.map((doc) => doc.data());
//     setAnswers(answersData);
//   };
//   fetchData();
//   const intervalId = setInterval(() => {
//     fetchData();
//   }, 5000);

//   return () => clearInterval(intervalId);
// }, [sessionId]);


//   return answers;
// };


const useAnswers = (sessionId: string) => {
  const [answers, setAnswers] = useState<any>([]);

  useEffect(() => {
    const q = query(
      collection(firestore, "answers"),
      where("sessionId", "==", sessionId || "xxxxxx")
    );
    const unsubscribe = onSnapshot(q.withConverter(postConverter), (querySnapshot) => {
      const answersData = querySnapshot.docs.map((doc) => doc.data());
      setAnswers(answersData);
    });
    // Cleanup the listener when component is unmounted
    return () => unsubscribe();
  }, [sessionId]);

  return answers;
};

export default useAnswers;
