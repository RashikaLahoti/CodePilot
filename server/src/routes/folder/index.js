import { Router } from "express";
import { createFolder } from "../../controller/folder/index.js";

const router = Router();

router.get("/create", createFolder)

export default router;