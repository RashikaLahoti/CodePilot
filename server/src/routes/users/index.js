import { Router } from "express";
import { registerUserController, loginUserController, meController, refreshTokenController } from "../../controller/users/index.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerUserController)
router.post("/login", loginUserController)
router.post("/refresh-token", refreshTokenController)
router.get("/me",authMiddleware, meController)


export default router;