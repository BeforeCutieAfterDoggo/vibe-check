import { NextApiRequest, NextApiResponse } from "next";
import { firestoreAdmin } from "../../lib/firebaseAdmin";

export interface SessionBody {
  sessionName: string;
  description: string;
  password: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { sessionName, description, password } = req.body as SessionBody;
      const sessionRef = await firestoreAdmin.collection("sessions").add({
        sessionName,
        description,
        password: password === "" ? undefined : password,
        questions: [],
        answers: [],
        active: false,
      });
      const sessionId = sessionRef.id;
      await firestoreAdmin
        .collection("sessions")
        .doc(sessionId)
        .update({ sessionId });
      return res.status(200).json({ sessionId });
      // res.status(200).json({ message: "Session created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export default handler;
