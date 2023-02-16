import { NextApiRequest, NextApiResponse } from "next";
import { text } from "stream/consumers";
import { firestoreAdmin } from "../../lib/firebaseAdmin";
import { QuestionType, QuestionUnion, Session } from "../../types";

export interface QuestionRequestBody {
  text: string;
}

const questions: QuestionUnion[] = [
  {
    type: QuestionType.SCALE,
    source: "admin",
    text: "How good is your experience regarding human connection at mars so far?",
    min: 1,
    max: 5,
    step: 1,
    minLabel: "Not good",
    maxLabel: "Very good",
    enableNote: true,
    noteComment: "What could be improved?",
  },
  {
    type: QuestionType.MULTIPLE_CHOICE,
    source: "admin",
    text: "What are your personal motivations for coming to mars?",
    options: [
      "Take a break from my normal life",
      "Experience community living",
      "Experience self-reliant off-grid living",
      "Make meaningful connections with people",
      "Learn new knowledge and skills",
      "Create and/or collaborate on a project",
      "Personal change and growth",
    ],
    minSelections: 1,
    allowOther: true,
  },
  {
    type: QuestionType.SHORT_ANSWER,
    source: "admin",
    text: "What is one thing you appreciate about mars?",
  },
];

const session: Session = {
  sessionName: "Test Session",
  description: "This is a test session",
  questions,
  answers: [],
  active: false,
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      await firestoreAdmin.collection("sessions").add(session);
      res.status(200).json({ message: "Question created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.status(405).end();
  }
};

export default handler;
