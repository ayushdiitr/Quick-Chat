import { Router } from "express";
import AuthController from "../controllers/authController";
import authMiddleware from "../middleware/authMiddleware";
import ChatGroupController from "../controllers/chatGroupController";
import ChatGroupUserController from "../controllers/chatGroupUserController";
import ChatsController from "../controllers/chatsController";

const router = Router();

// Auth Routes
router.post("/auth/login", AuthController.login)


// Chat Routes
router.get("/chat-group", authMiddleware, ChatGroupController.index)
router.post("/chat-group", authMiddleware, ChatGroupController.store)
router.get("/chat-group/:id",  ChatGroupController.showById)
router.put("/chat-group/:id", authMiddleware, ChatGroupController.update)
router.delete("/chat-group/:id", authMiddleware, ChatGroupController.deleteById)

// Chat group users
router.get("/chat-group-users",  ChatGroupUserController.index)
router.post("/chat-group-users",  ChatGroupUserController.store)

// Chats Messages
router.get("/chats/:groupId",  ChatsController.index)

export default router;