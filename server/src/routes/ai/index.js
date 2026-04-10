import { Router } from "express";
import generateController from "../../controller/ai/index.js";

const router = Router();

router.get("/generate/:chat", generateController)



export default router;
