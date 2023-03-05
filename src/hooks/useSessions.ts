import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../lib/firebase";


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
