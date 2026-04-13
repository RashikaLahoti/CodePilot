import { Router } from "express";
import aiController from "../../controller/ai/index.js";

const router = Router();

router.post("/generate", aiController.generateAIResponse);




export default router;
