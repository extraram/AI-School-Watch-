
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, AuthorizedPerson } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeSecurityFrame(
  base64Image: string,
  authorizedPeople: AuthorizedPerson[]
): Promise<AnalysisResult> {
  const peopleList = authorizedPeople.map(p => `${p.name} (${p.role})`).join(", ");
  
  const prompt = `You are a school security AI. Analyze this camera frame. 
  Authorized persons list: [${peopleList}].
  Determine if any human is visible. If yes, identify if they match someone in the authorized list or if they are "Unknown".
  Provide a concise security status.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Image.split(',')[1],
              },
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            detected: { type: Type.BOOLEAN, description: "True if a human is detected." },
            name: { type: Type.STRING, description: "The name identified or 'Unknown'." },
            status: { 
              type: Type.STRING, 
              enum: ["Authorized", "Unauthorized", "None"],
              description: "Security status of the person detected." 
            },
            reason: { type: Type.STRING, description: "A short reason for the identification." },
          },
          required: ["detected", "name", "status", "reason"],
        },
      },
    });

    const resultText = response.text || "{}";
    return JSON.parse(resultText) as AnalysisResult;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return {
      detected: false,
      name: "Error",
      status: "None",
      reason: "Could not process image."
    };
  }
}
