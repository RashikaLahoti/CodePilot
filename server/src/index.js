import express from "express";
import Router from "./routes/index.js";
import logger from "morgan";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./utils/error-handler.js";

connectDB();

const app = express();

app.use(logger("tiny"));
app.use(cookieParser());
app.use(express.json());

//handling routes
app.use("/api/v1", Router);

//error handling
app.use(errorMiddleware)
export default app;

