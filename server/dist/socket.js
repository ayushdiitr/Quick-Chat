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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocket = setupSocket;
const helper_1 = require("./helper");
function setupSocket(io) {
    // middleware
    io.use((socket, next) => {
        const room = socket.handshake.auth.room;
        if (!room) {
            return next(new Error("Invalid Room"));
        }
        socket.room = room;
        next();
    });
    io.on("connection", (socket) => {
        // Join the room
        socket.join(socket.room);
        socket.on("message", (data) => __awaiter(this, void 0, void 0, function* () {
            // socket.broadcast.emit("message", data);
            yield (0, helper_1.produceMessage)(process.env.KAFKA_TOPIC, data);
            socket.to(socket.room).emit("message", data);
        }));
        socket.on("disconnect", () => {
            console.log("The socket is disconnected...", socket.id);
        });
    });
}
