import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../lib/firebase";

// const useSessions = () => {
//   const [sessions, setSessions] = useState<any>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const querySnapshot = await getDocs(collection(firestore, "sessions"));
//       const sessionsData = querySnapshot.docs.map((doc) => doc.data());
//       setSessions(sessionsData);
//     };

//     // Fetch data initially and every 5 seconds
//     fetchData();
//     const intervalId = setInterval(() => {
//       fetchData();
//     },5000);

//     // Cleanup the interval when component is unmounted
//     return () => clearInterval(intervalId);
//   }, []);
//   return sessions;
// };


const useSessions = () => {
  const [sessions, setSessions] = useState<any>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, "sessions"), (querySnapshot) => {
      const sessionsData = querySnapshot.docs.map((doc) => doc.data());
      setSessions(sessionsData);
    });

    // Cleanup the listener when component is unmounted
    return () => unsubscribe();
  }, []);

  return sessions;
};

export default useSessions;
