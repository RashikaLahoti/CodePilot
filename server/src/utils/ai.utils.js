import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const callHuggingFace = async (prompt, key, mode = "chat") => {
    try {

        let systemPrompt = "";

        if (mode === "agent") {
            systemPrompt = `
            You are an AI agent. Always respond in JSON format like:
            {
              "action": "",
              "data": "",
              "status": "success"
            }
            `;
        }

        const response = await axios.post(
            "https://router.huggingface.co/v1/chat/completions",
            {
                model: "Qwen/Qwen3.5-35B-A3B:novita",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: prompt }
                ],
                max_tokens: 200,
                temperature: 0.7,
            },
            {
                headers: {
                    Authorization: `Bearer ${key}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const output = response.data.choices?.[0]?.message?.content;

        // 🔥 Important: parse JSON if agent mode
        if (mode === "agent") {
            try {
                return JSON.parse(output);
            } catch {
                throw new Error("Invalid JSON from AI");
            }
        }

        return output || "No response";

    } catch (err) {
        console.log(err);
        throw err;
    }
};

export default callHuggingFace;

import { GoogleGenAI } from "@google/genai";
import envVariables from "../config/config.env.js";
 
const ai = new GoogleGenAI({
  apiKey: envVariables.geminikey,
});

export async function callGemini(prompt, mode = "chat") {

    let systemPrompt = "";

    if (mode === "agent") {
        systemPrompt = `
        Respond ONLY in JSON format:
        {
          "action": "",
          "data": "",
          "status": "success"
        }
        `;
    }

    const finalPrompt = systemPrompt + "\n" + prompt;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: finalPrompt,
    });

    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (mode === "agent") {
    try {
        const clean = text.match(/\{[\s\S]*\}/);
        return JSON.parse(clean[0]);
    } catch (err) {
        console.error("JSON parse error:", text);
        throw new Error("Invalid JSON from Gemini");
    }
}

    return text;
}
