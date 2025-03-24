"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const socket_1 = require("./socket");
const redis_streams_adapter_1 = require("@socket.io/redis-streams-adapter");
const redis_config_1 = __importDefault(require("./config/redis.config"));
const kafka_config_1 = require("./config/kafka.config");
const helper_1 = require("./helper");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
    adapter: (0, redis_streams_adapter_1.createAdapter)(redis_config_1.default),
});
exports.io = io;
(0, socket_1.setupSocket)(io);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.send("Server is up!!");
});
app.use("/api", routes_1.default);
(0, kafka_config_1.connectKafkaProducer)().catch((err) => {
    console.log("Something went wrong with Kafka Producer", err);
});
(0, helper_1.consumeMessage)(process.env.KAFKA_TOPIC).catch((err) => {
    console.log("Something went wrong with Kafka Consumer", err);
});
server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
