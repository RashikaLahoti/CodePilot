import callHuggingFace, { callGemini } from "../../utils/ai.utils.js";
import { internalServerError, success } from "../../utils/response.util.js";
import envVariables from "../../config/config.env.js";

const generateController = async (req, res) => {
    try {
        const {chat} = req.params;
        
        const response = await callHuggingFace(chat, envVariables.huggingfacekey);
        return success(res, response);
    } catch (error) {
        console.log(error);
        return internalServerError(res, {message: error.message});
    }
}

const geminiController = async (req, res) => {
    try {
        const {chat} = req.params;
        const response = await callGemini(chat);
        return success(res, response);
    } catch (error) {
        console.log(error);
        return internalServerError(res, {message: error.message});
    }
}

export default {generateController, geminiController};