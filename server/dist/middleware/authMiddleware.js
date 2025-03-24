"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader === null || authHeader === undefined) {
        res.status(401).json({
            status: 401,
            message: "Unauthorized"
        });
        return;
    }
    const token = authHeader.split(" ")[1];
    // verify token
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            res.status(401).json({
                status: 401,
                message: "Unauthorized"
            });
            return;
        }
        req.user = user;
        next();
    });
};
exports.default = authMiddleware;
