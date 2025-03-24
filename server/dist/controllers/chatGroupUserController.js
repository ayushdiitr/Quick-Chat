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
class ChatGroupUserController {
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { group_id } = req.query;
                const users = yield db_config_1.default.groupUsers.findMany({
                    where: {
                        group_id: group_id,
                    },
                });
                res.json({ message: "success", data: users });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
                return;
            }
        });
    }
    static store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const users = yield db_config_1.default.groupUsers.create({
                    data: body
                });
                res.json({ message: "User Added successfully", data: users });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
                return;
            }
        });
    }
}
exports.default = ChatGroupUserController;
