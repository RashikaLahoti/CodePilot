import express from "express";
import Router from "./routes/index.js";
import logger from "morgan";
const app = express();

app.use(logger("tiny"));
app.use(express.json());

//handling routes
app.use("/api/v1", Router);

