import { Server, Socket } from "socket.io";
import prisma from "./config/db.config";
import { produceMessage } from "./helper";

interface CustomSocket extends Socket {
  room?: string;
}

export function setupSocket(io: Server) {
  // middleware
  io.use((socket: CustomSocket, next) => {
    const room = socket.handshake.auth.room;
    if (!room) {
      return next(new Error("Invalid Room"));
    }
    socket.room = room;
    next();
  });

  io.on("connection", (socket: CustomSocket) => {
    // Join the room
    socket.join(socket.room!);

    socket.on("message", async (data) => {
      // socket.broadcast.emit("message", data);
      await produceMessage(process.env.KAFKA_TOPIC!, data) 

      socket.to(socket.room!).emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("The socket is disconnected...", socket.id);
    });
  });
}
