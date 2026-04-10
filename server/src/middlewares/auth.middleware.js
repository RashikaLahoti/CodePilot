import jwt from "jsonwebtoken";
import envVariables from "../config/config.env.js";
import { badRequest, internalServerError } from "../utils/response.util.js";

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if(!token) {
            return badRequest(res, {message: "Token not found"});
        }
        const decodedToken = jwt.verify(token, envVariables.jwtsecretkey);
        req.user = decodedToken;
        next();
    } catch (error) {
        return internalServerError(res, {message: error.message});
    }
}