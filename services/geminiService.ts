
import { GoogleGenAI, Type } from "@google/genai";
import { FilterState } from "../types";

// Always use process.env.API_KEY directly for initialization as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const parseVoiceCommand = async (command: string): Promise<FilterState> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following hiring request from an MSME owner and extract filters: "${command}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          role: { type: Type.STRING, description: "Extracted job role like Delivery, Retail, etc." },
          location: { type: Type.STRING, description: "Extracted area or location" },
          education: { type: Type.STRING, description: "Education filter like 10th pass, Graduate" },
          count: { type: Type.NUMBER, description: "Number of people requested" }
        }
      }
    }
  });

  try {
    // response.text is a property, not a method
    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (e) {
    return {};
  }
};

export const generateJobDescription = async (role: string, salary: string, hours: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Create a professional but simple job description for an MSME hiring a "${role}". Salary: ${salary}. Hours: ${hours}. Keep it short and readable for blue-collar workers.`,
  });
  // response.text is a property
  return response.text || "Job Description details...";
};

export const generateOfferMessage = async (candidateName: string, role: string, salary: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Create a friendly WhatsApp offer message for ${candidateName} for the role of ${role} with salary ${salary}. Include a call to action to start tomorrow. Use emojis.`,
  });
  // response.text is a property
  return response.text || "Congratulations! You are selected...";
};
