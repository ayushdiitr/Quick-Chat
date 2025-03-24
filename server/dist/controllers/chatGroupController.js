"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("../config/db.config"));
class ChatGroupController {
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!user) {
                    res.status(400).json({
                        message: "User not found"
                    });
                    return;
                }
                const groups = yield db_config_1.default.chatGroup.findMany({
                    where: {
                        user_id: user.id
                    },
                    orderBy: {
                        created_at: 'desc'
                    }
                });
                res.json({
                    message: "Chat groups fetched successfully",
                    data: groups
                });
                return;
            }
            catch (error) {
                res.status(500).json({
                    message: "Something went wrong"
                });
                return;
            }
        });
    }
    static showById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const groups = yield db_config_1.default.chatGroup.findUnique({
                    where: {
                        id: id
                    },
                });
                res.json({
                    message: "Chat group fetched successfully",
                    data: groups
                });
                return;
            }
            catch (error) {
                res.status(500).json({
                    message: "Something went wrong"
                });
                return;
            }
        });
    }
    static store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const user = req.user;
                if (!user) {
                    res.status(400).json({
                        message: "User not found"
                    });
                    return;
                }
                yield db_config_1.default.chatGroup.create({
                    data: {
                        title: body === null || body === void 0 ? void 0 : body.title,
                        passCode: body === null || body === void 0 ? void 0 : body.passCode,
                        user_id: user.id,
                    }
                });
                res.json({
                    message: "Chat group created successfully"
                });
                return;
            }
            catch (error) {
                res.status(500).json({
                    message: "Something went wrong"
                });
                return;
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const { id } = req.params;
                yield db_config_1.default.chatGroup.update({
                    where: {
                        id: id
                    },
                    data: {
                        title: body === null || body === void 0 ? void 0 : body.title,
                        passCode: body === null || body === void 0 ? void 0 : body.passCode,
                    }
                });
                res.json({
                    message: "Chat group updated successfully"
                });
                return;
            }
            catch (error) {
                res.status(500).json({
                    message: "Something went wrong"
                });
                return;
            }
        });
    }
    static deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield db_config_1.default.chatGroup.delete({
                    where: {
                        id: id
                    },
                });
                res.json({
                    message: "Chat group Deleted successfully",
                });
                return;
            }
            catch (error) {
                res.status(500).json({
                    message: "Something went wrong"
                });
                return;
            }
        });
    }
}
exports.default = ChatGroupController;
