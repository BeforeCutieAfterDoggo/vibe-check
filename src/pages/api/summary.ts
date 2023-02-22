import { NextApiRequest, NextApiResponse } from "next";
import { Answer, Question } from "../../types";
import { OpenAIApi, Configuration } from "openai";

export type JudgePersonality = "perky" | "cool" | "snarky";

const personalityMap: Record<JudgePersonality, string> = {
  perky:
    "You are the happy, perky, enthusiastic judge. You are generally optimistic and speak gleefully, and call people sweethearts and dearies",
  cool: "You are the cool, calm, collected judge. Everything you say is smooth, slick, and maximally vibratious",
  snarky:
    "You are the snarky, tough love judge. You are a bit of a curmudgeon and say things in a grumpy way, but you have a heart of gold and want the best for everyone",
};

const promptFn = (formatted: string, personality: string) => {
  return `You are powering an app called 'VibeCheck'. This is an anonymous social survey app which is intended to run a handful of questions to get the vibe of a group. There are three types of question: [short-answer], [scale], [multiple-choice].

Here are the results of the questions:

${formatted}

${personality}. It is VERY IMPORTANT you answer in character. Your job is to summarize the community in a paragraph. When you are done summarizing, please write: endofsummary.`;
};

const scaleAverage = (answers: Answer[]) => {
  const sum = answers.reduce((acc, a) => acc + a.response.value, 0);
  return sum / answers.length;
};

const multipleChoiceCounter = (answers: Answer[]) => {
  console.log("123", answers);
  const counter: Record<string, number> = {};
  answers.forEach((a) => {
    const { response } = a;
    if (response.options) {
      response.options.forEach((o:any) => {
        if (counter[o]) {
          counter[o] += 1;
        } else {
          counter[o] = 1;
        }
      });
    }
    if (response.other) {
      if (counter[response.other]) {
        counter[response.other] += 1;
      } else {
        counter[response.other] = 1;
      }
    }
  });
  return counter;
};

const answerFormatter = (question: Question, answers: Answer[]) => {
  switch (question.type) {
    case "scale":
      return `${scaleAverage(answers)}/5`;
    case "multiple-choice":
      const counter = multipleChoiceCounter(answers);
      const counterAsString = Object.entries(counter).map(
        ([key, value]) => `${key}: ${value}`
      );
      return counterAsString.join("\n");
    case "short-answer":
      return answers.map((a) => a.response.text).join("\n");
    default:
      return "";
  }
};

const questionFormatter = (questions: Question[], answers: Answer[]) => {
  /* Example

  Q{idx}: [${QUESTION_TYPE}] ${QUESTION}
  A{idx}: ${ANSWER}
  */

  const formatted = questions.map((q, i) => {
    const questionAnswers = answers.filter((a) => a.questionId === q.id);
    const formattedAnswer = answerFormatter(q, questionAnswers);
    return `Q${i}: [${q.type}] ${q.text}
A${i}: ${formattedAnswer}`;
  });
  return formatted.join("\n\n");
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { questions, answers, personalityType } = req.body;
      const config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(config);
      const formatted = questionFormatter(questions, answers);
      const prompt = promptFn(formatted, personalityMap[personalityType]);
      const completion = await openai.createCompletion({
        prompt: prompt,
        max_tokens: 1200,
        temperature: 0.8,
        model: "text-davinci-003",
        stop: ["endofsummary", "Endofsummary", "ENDOFSUMMARY"],
      });
      const summary = completion.data.choices[0].text?.trimStart();
      res.status(200).json({ summary });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export default handler;
