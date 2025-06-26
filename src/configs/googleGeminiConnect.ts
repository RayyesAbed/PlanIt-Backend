import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

let cachedModel: GenerativeModel | null = null; // To improve performance by cachning the Gemini AI model

const googleGeminiConnect = async () => {
  if (cachedModel) {
    return cachedModel;
  }

  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set!");
  }

  try {
    const googleGemini = new GoogleGenerativeAI(GEMINI_API_KEY);

    cachedModel = googleGemini.getGenerativeModel({
      model: "gemini-2.5-flash-preview-04-17",
    });

    return cachedModel;
  } catch (error) {
    console.error("Error connecting to Google Gemini:", error);
    process.exit(1);
  }
};

export default googleGeminiConnect;
