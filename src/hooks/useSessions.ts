import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../lib/firebase";

const useSessions = () => {
  const [sessions, setSessions] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestore, "sessions"));
      const sessionsData = querySnapshot.docs.map((doc) => doc.data());
      setSessions(sessionsData);
    };

    // Fetch data initially and every 5 seconds
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    // Cleanup the interval when component is unmounted
    return () => clearInterval(intervalId);
  }, []);
  console.log("111", sessions)
  return sessions;
};

export default useSessions;
