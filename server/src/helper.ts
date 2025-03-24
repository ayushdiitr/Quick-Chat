import prisma from "./config/db.config";
import { consumer, producer } from "./config/kafka.config"

export const produceMessage = async(topic: string, message: any) => {
    await producer.send({
        topic,
        messages:[{value: JSON.stringify(message)}]
    })
}

export const consumeMessage = async(topic: string) => {
    await consumer.connect();
    await consumer.subscribe({topic:topic});

    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            const data = JSON.parse(message.value?.toString() || '');
            
            await prisma.chats.create({
                data: data
            })
        }
    })
}