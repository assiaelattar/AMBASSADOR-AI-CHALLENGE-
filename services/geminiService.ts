
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getIdeaFeedback = async (problem: string, solution: string) => {
  if (!process.env.API_KEY) return "AI advisor currently unavailable.";
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `I am a student at Ambassadeur School entering an AI Challenge. 
      Problem: ${problem}
      Proposed Solution: ${solution}
      
      Give me 3 short, punchy tips to make this project better for a school setting. Keep it encouraging and technical.`,
      config: {
        systemInstruction: "You are a tech mentor for a high school AI competition. Your goal is to give brief, inspiring, and technically sound advice.",
        temperature: 0.7,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini error:", error);
    return "The AI is currently thinking about its own projects. Try again later!";
  }
};
