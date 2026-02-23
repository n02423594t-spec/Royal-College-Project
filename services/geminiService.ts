
import { GoogleGenAI, Type } from "@google/genai";
import { FertilityLevel, SoilAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function analyzeSoilImage(base64Image: string): Promise<Partial<SoilAnalysis>> {
  const modelName = 'gemini-3-flash-preview';
  
  const response = await ai.models.generateContent({
    model: modelName,
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image.split(',')[1] || base64Image,
          },
        },
        {
          text: `You are an expert soil scientist. Analyze this soil sample image for academic decision support. 
          Provide a detailed assessment including fertility level (Low, Medium, High), 
          soil type description, estimated organic matter, and specific fertilizer recommendations.
          Estimate Nitrogen (N), Phosphorus (P), and Potassium (K) levels on a scale of 0-100 based on visual cues (color, texture, moisture).`
        }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          fertilityLevel: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
          confidence: { type: Type.NUMBER },
          soilType: { type: Type.STRING },
          organicMatterEstimate: { type: Type.STRING },
          nutrientProfile: {
            type: Type.OBJECT,
            properties: {
              nitrogen: { type: Type.NUMBER },
              phosphorus: { type: Type.NUMBER },
              potassium: { type: Type.NUMBER }
            },
            required: ['nitrogen', 'phosphorus', 'potassium']
          },
          recommendations: {
            type: Type.OBJECT,
            properties: {
              fertilizerType: { type: Type.STRING },
              dosage: { type: Type.STRING },
              notes: { type: Type.STRING }
            },
            required: ['fertilizerType', 'dosage', 'notes']
          }
        },
        required: ['fertilityLevel', 'confidence', 'soilType', 'organicMatterEstimate', 'nutrientProfile', 'recommendations']
      }
    }
  });

  const result = JSON.parse(response.text);
  return result;
}
