import { NextApiRequest, NextApiResponse } from "next";
import { firestoreAdmin } from "../../lib/firebaseAdmin";

export interface QuestionRequestBody {
  text: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { text } = req.body as QuestionRequestBody;
      await firestoreAdmin.collection("questions").add({ text });
      res.status(200).json({ message: "Question created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export default handler;
