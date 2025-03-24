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
exports.connectKafkaProducer = exports.consumer = exports.producer = exports.kafka = void 0;
const kafkajs_1 = require("kafkajs");
exports.kafka = new kafkajs_1.Kafka({
    brokers: [process.env.KAFKA_BROKER_URL || "localhost:9092"],
    logLevel: kafkajs_1.logLevel.ERROR,
});
exports.producer = exports.kafka.producer();
exports.consumer = exports.kafka.consumer({ groupId: "chats" });
const connectKafkaProducer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.producer.connect();
    console.log("Kafka Producer Connected...");
});
exports.connectKafkaProducer = connectKafkaProducer;
