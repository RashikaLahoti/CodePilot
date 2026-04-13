import { Router } from "express";
import { createFolder, deleteFolder, getFolder, renameFolder } from "../../controller/folder/index.js";

const router = Router();

router.post("/create", createFolder)
router.get("/get", getFolder)
router.post("/rename", renameFolder)
router.post("/delete", deleteFolder)

export default router;