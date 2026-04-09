import { Router } from "express";
import folderRouter from "./folder/index.js";
import userRouter from "./users/index.js";

const router = Router();

router.use("/folder", folderRouter);
router.use("/user", userRouter);


export default router;