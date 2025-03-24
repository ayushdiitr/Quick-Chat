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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    static login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = request.body;
                let findUser = yield db_config_1.default.user.findUnique({
                    where: {
                        email: body.email
                    }
                });
                if (!findUser) {
                    findUser = yield db_config_1.default.user.create({
                        data: body
                    });
                }
                let JWTPayload = {
                    name: body.name,
                    email: body.email,
                    id: findUser.id
                };
                const token = jsonwebtoken_1.default.sign(JWTPayload, process.env.JWT_SECRET, { expiresIn: "20d" });
                response.json({
                    message: "Logged in successfully",
                    user: Object.assign(Object.assign({}, findUser), { token: `Bearer ${token}` })
                });
                return;
            }
            catch (error) {
                response.status(500).json({
                    message: "Something went wrong"
                });
                return;
            }
        });
    }
}
exports.default = AuthController;
