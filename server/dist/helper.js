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
exports.consumeMessage = exports.produceMessage = void 0;
const db_config_1 = __importDefault(require("./config/db.config"));
const kafka_config_1 = require("./config/kafka.config");
const produceMessage = (topic, message) => __awaiter(void 0, void 0, void 0, function* () {
    yield kafka_config_1.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }]
    });
});
exports.produceMessage = produceMessage;
const consumeMessage = (topic) => __awaiter(void 0, void 0, void 0, function* () {
    yield kafka_config_1.consumer.connect();
    yield kafka_config_1.consumer.subscribe({ topic: topic });
    yield kafka_config_1.consumer.run({
        eachMessage: (_a) => __awaiter(void 0, [_a], void 0, function* ({ topic, partition, message }) {
            var _b;
            const data = JSON.parse(((_b = message.value) === null || _b === void 0 ? void 0 : _b.toString()) || '');
            yield db_config_1.default.chats.create({
                data: data
            });
        })
    });
});
exports.consumeMessage = consumeMessage;
