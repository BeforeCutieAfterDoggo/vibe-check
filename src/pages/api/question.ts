import { NextApiRequest, NextApiResponse } from "next";
import { firestoreAdmin } from "../../lib/firebaseAdmin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      await firestoreAdmin.collection("questions").add({
        ...req.body,
        createdAt: new Date(),
      }).then(docRef => {
        const questionID = docRef.id;
        docRef.update({ questionId: questionID });
      })
      res.status(200).json({ message: "Question created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export default handler;
