import { Router } from "express";
import { createFile, readFile, updateFile, deleteFile } from "../../controller/files/index.js";

const router = Router();

router.post("/create-file", createFile)
router.get("/read-file", readFile)
router.put("/update-file", updateFile)
router.delete("/delete-file", deleteFile)

export default router;