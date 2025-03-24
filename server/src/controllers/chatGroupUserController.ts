import prisma from "../config/db.config";
import { Request, Response } from "express";

interface GroupUserType{
    name: string;
    group_id: string;
}

class ChatGroupUserController {
    static async index(req:Request, res: Response) {
        try {
            const {group_id} = req.query;
            const users = await prisma.groupUsers.findMany({
                where: {
                    group_id: group_id as string,
                },
            })
            res.json({message: "success", data: users})
        } catch (error) {
            res.status(500).json({message: (error as Error).message})
            return;
        }
    }


    static async store(req:Request, res: Response) {
        try {
            const body: GroupUserType = req.body;
            const users = await prisma.groupUsers.create({
                data: body
            })
            res.json({message: "User Added successfully", data: users})
        } catch (error) {
            res.status(500).json({message: (error as Error).message})
            return;
        }
    }
}

export default ChatGroupUserController;