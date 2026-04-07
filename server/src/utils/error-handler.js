import { internalServerError } from "./response.util.js";

const errorMiddleware = (err, __, res, _) => {
  return internalServerError(res, err.message || err.stack);
};

export default errorMiddleware;