import { Router } from "express";
import aiController from "../../controller/ai/index.js";

const router = Router();

router.get("/generate/huggingface/:chat", aiController.generateController);
router.get("/generate/gemini/:chat", aiController.geminiController);




export default router;
