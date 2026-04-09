import express from "express";
import Router from "./routes/index.js";
import logger from "morgan";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

connectDB();

const app = express();

app.use(logger("tiny"));
app.use(cookieParser());
app.use(express.json());

//handling routes
app.use("/api/v1", Router);

export default app;

