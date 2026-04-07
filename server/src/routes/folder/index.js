import { Router } from "express";
import { createFolder, createFile, readFile, deleteFile, updateFile } from "../../controller/folder/index.js";

const router = Router();

router.get("/create", createFolder)
router.get("/create-file", createFile)
router.get("/read-file", readFile)
router.get("/update-file", updateFile)
router.get("/delete-file", deleteFile)

export default router;