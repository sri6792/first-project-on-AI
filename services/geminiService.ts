import { GoogleGenAI, Type } from "@google/genai";
import type { CalorieAnalysisResult } from '../types';

const systemInstruction = `You are an expert nutritionist and AI assistant named NutriAI. Your goal is to analyze a user's description of a meal and provide an estimated calorie count. 
You must be aware of various cuisines, including regional variations (e.g., North Indian vs. South Indian curry). 
You need to standardize portion sizes (e.g., 'a medium bowl' is ~300g, 'a slice of pizza' is ~120g, 'a chapati' is ~30g, 'a cup of rice' is ~150g). 
When you are not confident, you should provide a lower confidence score and ask a clarifying question to improve accuracy. 
Always respond in the JSON format defined by the provided schema. Be encouraging and friendly in your feedback. Your feedback should be concise.`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    totalCalories: {
      type: Type.NUMBER,
      description: 'The total estimated calories for the entire meal.'
    },
    confidenceScore: {
      type: Type.NUMBER,
      description: 'A score from 0 to 100 representing your confidence in the estimation.'
    },
    items: {
      type: Type.ARRAY,
      description: 'A breakdown of each food item identified in the meal.',
      items: {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: 'The name of the food item.'
          },
          portion: {
            type: Type.STRING,
            description: 'The estimated portion size of the item (e.g., "1 medium bowl", "2 slices").'
          },
          calories: {
            type: Type.NUMBER,
            description: 'The estimated calories for this specific item.'
          }
        },
        required: ['name', 'portion', 'calories']
      }
    },
    clarification: {
      type: Type.STRING,
      description: 'A question to the user for better accuracy, if needed. Null if no clarification is needed.'
    },
    feedback: {
      type: Type.STRING,
      description: 'General, encouraging feedback or notes about the estimation.'
    }
  },
  required: ['totalCalories', 'confidenceScore', 'items', 'feedback']
};


export const analyzeMeal = async (mealDescription: string): Promise<CalorieAnalysisResult> => {
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    console.error("API_KEY environment variable not set");
    throw new Error("API key is not configured. Please set it up in your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: mealDescription,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result as CalorieAnalysisResult;
  } catch (error) {
    console.error("Error analyzing meal with Gemini API:", error);
    throw new Error("Failed to analyze meal. The AI model might be busy. Please try again later.");
  }
};
