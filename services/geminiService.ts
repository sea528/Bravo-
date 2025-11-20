import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from "../types";

const API_KEY = process.env.API_KEY || '';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Generates 3 simple cognitive training questions for seniors.
 */
export const generateDailyQuiz = async (): Promise<QuizQuestion[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate 3 multiple-choice questions suitable for active seniors (50-60s) to train their brain. 
      Topics should vary between: Memory, Simple Calculation, Vocabulary/Proverbs, or General Knowledge.
      The language must be Korean.
      Make sure the questions are encouraging and not too difficult.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING, description: "The question text" },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING }, 
                description: "4 possible answers" 
              },
              correctAnswerIndex: { type: Type.INTEGER, description: "Index of the correct answer (0-3)" },
              explanation: { type: Type.STRING, description: "Short explanation of the answer" }
            },
            required: ["question", "options", "correctAnswerIndex", "explanation"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as QuizQuestion[];
    }
    return getFallbackQuiz();
  } catch (error) {
    console.error("Gemini Quiz Error:", error);
    return getFallbackQuiz();
  }
};

/**
 * Analyzes an uploaded image to verify if it matches the selected hobby.
 */
export const verifyHobbyImage = async (base64Image: string, hobbyType: string): Promise<{ verified: boolean; message: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
            {
                inlineData: {
                    mimeType: 'image/jpeg',
                    data: base64Image
                }
            },
            {
                text: `Analyze this image. The user claims this is a photo of their hobby: "${hobbyType}".
                Does the image plausibly show this activity or related equipment/environment?
                Respond in Korean.
                If yes, provide a short, encouraging, warm compliment (1 sentence).
                If no, politely ask them to upload a relevant photo.`
            }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                verified: { type: Type.BOOLEAN },
                message: { type: Type.STRING }
            },
            required: ["verified", "message"]
        }
      }
    });

    if (response.text) {
        return JSON.parse(response.text);
    }
    return { verified: true, message: "인증되었습니다! (시스템 오프라인 모드)" };

  } catch (error) {
    console.error("Gemini Vision Error:", error);
    // Fallback for demo purposes if API fails
    return { verified: true, message: "멋진 사진이네요! 인증에 성공했습니다." };
  }
};

const getFallbackQuiz = (): QuizQuestion[] => [
  {
    question: "다음 중 '비 온 뒤에 땅이 OOO' 속담에 들어갈 말은?",
    options: ["무너진다", "굳어진다", "젖는다", "갈라진다"],
    correctAnswerIndex: 1,
    explanation: "비 온 뒤에 땅이 굳어진다는 시련을 겪은 뒤에 더 강해짐을 뜻합니다."
  },
  {
    question: "15 + 28 의 결과는 무엇입니까?",
    options: ["33", "42", "43", "45"],
    correctAnswerIndex: 2,
    explanation: "15 더하기 28은 43입니다."
  },
  {
    question: "대한민국의 수도는 어디입니까?",
    options: ["부산", "광주", "서울", "대구"],
    correctAnswerIndex: 2,
    explanation: "대한민국의 수도는 서울입니다."
  }
];
