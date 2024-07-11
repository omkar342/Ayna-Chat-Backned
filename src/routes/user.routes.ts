import { Router } from "express";
import { registerController } from "../controllers/user.controller";

const router = Router();

router.get("/register", registerController);

export default router;