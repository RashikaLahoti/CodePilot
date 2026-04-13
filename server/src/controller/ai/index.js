import callHuggingFace, { callGemini } from "../../utils/ai.utils.js";
import { internalServerError, success } from "../../utils/response.util.js";
import envVariables from "../../config/config.env.js";

const generateAIResponse = async (req, res) => {
    try {
        const { prompt, mode, provider } = req.body;

        let response;

        if (provider === "gemini") {
            response = await callGemini(prompt, mode);
        } else {
            response = await callHuggingFace(prompt, envVariables.huggingfacekey, mode);
        }

        return success(res, response);
    } catch (error) {
        console.log(error);
        return internalServerError(res, { message: error.message });
    }
};

const geminiController = async (req, res) => {
    try {
        const {prompt} = req.body;
        const response = await callGemini(prompt);
        return success(res, response);
    } catch (error) {
        console.log(error);
        return internalServerError(res, {message: error.message});
    }
}

export default {generateAIResponse, geminiController};