export const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if(!token) {
            return badRequest(res, {message: "Token not found"});
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decodedToken;
        next();
    } catch (error) {
        return internalServerError(res, {message: error.message});
    }
}