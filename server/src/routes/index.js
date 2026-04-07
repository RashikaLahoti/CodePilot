import { Router } from "express";
import folderRouter from "./folder/index.js";


const router = Router();
router.use("/folder", folderRouter);


export default router;