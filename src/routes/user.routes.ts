import { Router } from "express";
import { registerController, loginController, loginWithTokenController } from "../controllers/user.controller";
import { verifyAccessToken } from "../middlewares/jwt.middleware";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/login/token/access", verifyAccessToken, loginWithTokenController);

export default router;