import { Router } from "express";
import { saveChatController, getSavedChatController, saveNewMeesageController } from "../controllers/chat.controller";
import { verifyAccessToken } from "../middlewares/jwt.middleware";

const router = Router();

router.post("/get-saved-chats", verifyAccessToken, getSavedChatController);

router.post("/save-new-chat", verifyAccessToken, saveChatController);

router.post("/save-message", verifyAccessToken, saveNewMeesageController);

export default router;