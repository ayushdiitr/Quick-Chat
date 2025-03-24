import * as yup from "yup";

export const createChatSchema = yup.object({
    title: yup.string().required().min(4, "Title must be at least 4 characters"),
    passCode: yup.string().required().min(4, "Passcode must be at least 4 characters"),
})

export type createChatSchemaType = yup.InferType<typeof createChatSchema>;