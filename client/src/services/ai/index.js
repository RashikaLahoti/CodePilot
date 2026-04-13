import { axiosInstance } from "../../config/axios.config.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const askAI = asyncHandler(async ({ prompt, mode, provider }) => {
    const response = await axiosInstance.post("/ai/generate", {
        prompt,
        mode,
        provider,
    });
    return response.data;
});