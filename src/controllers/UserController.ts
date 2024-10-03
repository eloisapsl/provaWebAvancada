import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class UserController{
    constructor(){}

    async createUser(req: Request, res: Response){
        try{
            const userData = req.body;

            const createdUser = await prisma.user.create({
                data: userData
            })
            res.json({
                status: 200,
                newuser: createdUser
            });

        }catch(error){
            console.log(error);
            res.status(500).json({
            error: error,
      });
        }
    }

    async getAllUsers(req: Request, res: Response){
        try{
            const users = await prisma.user.findMany()
            res.json(users);
        }catch(error){
            console.log(error);
            res.status(500).json({
            error: error,
      });
        }
    }

    async updateUser(req: Request, res: Response){
        try{
            const userId = parseInt(req.params.id)
            const updateUserData = req.body
            const updatedUser = await prisma.user.update({
                where: {id: userId},
                data: updateUserData,
              });

                 res.json({
                  status: 200,
                  updatedUser: updatedUser,
                });
              
        
        }catch(error){
            console.log(error);
            res.status(500).json({
                error: error
            })
        }
    }

    async deleteUser(req: Request, res: Response){
        try{
            const userId = parseInt(req.params.id)

            await prisma.user.delete({
                where: {id: userId}
            })
            res.json({
                status:200,
                message: "Usuario deletado com sucesso!"
            });
        }catch(error){
            console.log(error);
            res.status(500).json({
                error: error
            })
        }
    }
}

export default new UserController();