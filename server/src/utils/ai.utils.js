import axios from "axios";

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