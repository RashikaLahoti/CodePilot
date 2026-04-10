import dotenv from "dotenv";
dotenv.config();

const envVariables={
    geminikey : process.env.GEMINI_API_KEY,
    huggingfacekey : process.env.HUGGING_FACE_KEY,
    jwtsecretkey : process.env.JWT_SECRET_KEY,
    refreshtokensecret : process.env.REFRESH_TOKEN_SECRET,
    port : process.env.PORT,
    mongodburi : process.env.MONGODB_URI
}

export default Object.freeze(envVariables)

