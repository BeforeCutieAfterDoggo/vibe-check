import { firestore } from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import { firestoreAdmin } from "../../lib/firebaseAdmin";
export interface AnswerRequestBody {
  userId: string;
  questionId: string;
  response: any;
  skipped: boolean;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const questionRef = firestoreAdmin.collection("questions").doc(req.body.questionId);
      await questionRef.update({
        answers: firestore.FieldValue.arrayUnion({
          response: req.body.response,
          userId: req.body.userId
        })
      });
      res.status(200).json({ message: "Answer created successfully" });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export default handler;
