import express from "express";
import Router from "./routes/index.js";
import logger from "morgan";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./utils/error-handler.js";
import { notFound } from "./utils/response.util.js";

connectDB();

const app = express();

app.use(logger("tiny"));
app.use(cookieParser());
app.use(express.json());

//handling routes
app.use("/api/v1", Router);

//404 handler
app.use((req, res)=>{
    return notFound(res, {
    ip: req.ip,
    method: req.method,
    url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
  });
})

//error handling
app.use(errorMiddleware)
export default app;

