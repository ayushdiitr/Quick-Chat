"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const chatGroupController_1 = __importDefault(require("../controllers/chatGroupController"));
const chatGroupUserController_1 = __importDefault(require("../controllers/chatGroupUserController"));
const chatsController_1 = __importDefault(require("../controllers/chatsController"));
const router = (0, express_1.Router)();
// Auth Routes
router.post("/auth/login", authController_1.default.login);
// Chat Routes
router.get("/chat-group", authMiddleware_1.default, chatGroupController_1.default.index);
router.post("/chat-group", authMiddleware_1.default, chatGroupController_1.default.store);
router.get("/chat-group/:id", chatGroupController_1.default.showById);
router.put("/chat-group/:id", authMiddleware_1.default, chatGroupController_1.default.update);
router.delete("/chat-group/:id", authMiddleware_1.default, chatGroupController_1.default.deleteById);
// Chat group users
router.get("/chat-group-users", chatGroupUserController_1.default.index);
router.post("/chat-group-users", chatGroupUserController_1.default.store);
// Chats Messages
router.get("/chats/:groupId", chatsController_1.default.index);
exports.default = router;
