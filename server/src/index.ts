import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";
import { Server } from "socket.io";
import { createServer } from "http";
import { setupSocket } from "./socket";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import redis from "./config/redis.config";
import { connectKafkaProducer } from "./config/kafka.config";
import { consumeMessage } from "./helper";


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

const server = createServer(app);
const io = new Server(server,{
  cors: {
    origin: "*",
  },
  adapter:createAdapter(redis),
})

setupSocket(io);
export {io};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up!!");
});

app.use("/api", router);

connectKafkaProducer().catch((err) => {
  console.log("Something went wrong with Kafka Producer", err);
})

consumeMessage(process.env.KAFKA_TOPIC!).catch((err) => {
  console.log("Something went wrong with Kafka Consumer", err);

})

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});