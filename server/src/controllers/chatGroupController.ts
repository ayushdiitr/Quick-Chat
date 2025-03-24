import prisma from "../config/db.config";
import { Request, Response } from "express";

class ChatGroupController {

    static async index(req: Request, res: Response){
        try {
            const user = req.user;
            if (!user) {
                res.status(400).json({
                    message: "User not found"
                });
                return;
            }
            const groups = await prisma.chatGroup.findMany({
                where:{
                    user_id: user.id
                },
                orderBy:{
                    created_at:'desc'
                }
            })
            res.json({
                message:"Chat groups fetched successfully",
                data: groups
            })
            return;
        } catch (error) {
            res.status(500).json({
                message:"Something went wrong"
            })
            return;
        }
    }

    static async showById(req: Request, res: Response){
        try {
            const {id} = req.params;
            
            const groups = await prisma.chatGroup.findUnique({
                where:{
                    id: id
                },
            })
            res.json({
                message:"Chat group fetched successfully",
                data: groups
            })
            return;
        } catch (error) {
            res.status(500).json({
                message:"Something went wrong"
            })
            return;
        }
    }

    static async store(req: Request, res: Response){
        try {
            const body = req.body;
            const user = req.user;
            if (!user) {
                res.status(400).json({
                    message: "User not found"
                });
                return;
            }
            await prisma.chatGroup.create({
                data:{
                    title: body?.title,
                    passCode: body?.passCode,
                    user_id: user.id,
                }
            })
            res.json({
                message:"Chat group created successfully"
            })
            return;
        } catch (error) {
            res.status(500).json({
                message:"Something went wrong"
            })
            return;
        }
    }

    static async update(req: Request, res: Response){
        try {
            const body = req.body;
            const {id} = req.params;
            
            await prisma.chatGroup.update({
                where:{
                    id: id
                },
                data: {
                    title: body?.title,
                    passCode: body?.passCode,
                }
            })
            res.json({
                message:"Chat group updated successfully"
            })
            return;
        } catch (error) {
            res.status(500).json({
                message:"Something went wrong"
            })
            return;
        }
    }

    static async deleteById(req: Request, res: Response){
        try {
            const {id} = req.params;
            
            await prisma.chatGroup.delete({
                where:{
                    id: id
                },
            })
            res.json({
                message:"Chat group Deleted successfully",
            })
            return;
        } catch (error) {
            res.status(500).json({
                message:"Something went wrong"
            })
            return;
        }
    }
}

export default ChatGroupController;