import callHuggingFace from "../../utils/ai.utils.js";
import { internalServerError, success } from "../../utils/response.util.js";

const generateController = async (req, res) => {
    try {
        const {chat} = req.params;
        const response = await callHuggingFace(chat, process.env.HUGGING_FACE_KEY);
        return success(res, {response});
    } catch (error) {
        console.log(error);
        return internalServerError(res, {message: error.message});
    }
}

export default generateController;