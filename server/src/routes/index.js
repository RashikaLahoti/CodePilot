import { Router } from "express";
import folderRouter from "./folder/index.js";
import userRouter from "./users/index.js";
import aiRouter from "./ai/index.js";

const router = Router();

router.use("/folder", folderRouter);
router.use("/user", userRouter);
router.use("/ai", aiRouter);


export default router;