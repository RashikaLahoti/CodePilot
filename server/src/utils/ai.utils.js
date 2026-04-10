import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const callHuggingFace = async (prompt, key)=>{
    try {
        let response = await axios.post("https://router.huggingface.co/v1/chat/completions",{
        model: "Qwen/Qwen3.5-35B-A3B:novita",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 100,
        temperature: 0.7,
      },
      {
        headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json"
        }
      }
    )
    console.log(response.data.choices?.[0]?.message?.content)
    return response.data.choices?.[0]?.message?.content || "No response";
    } catch (err) {
        if (err.response) {
      console.error("HF Error Data:", err.response.data);
      console.error("HF Status:", err.response.status);
    } else {
      console.error("HF Error:", err.message);
    }
    console.log(err);
    return "AI Error";
  }
}

export default callHuggingFace;

import { GoogleGenAI } from "@google/genai";
import envVariables from "../config/config.env.js";
 
const ai = new GoogleGenAI({
  apiKey: envVariables.geminikey,
});

export async function callGemini(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  console.log("Gemini Response: ", response.text);
  return response;
}
