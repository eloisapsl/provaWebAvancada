import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class PostController{
    constructor(){}

    async listPosts(req: Request, res: Response){
        try{
            const posts = await prisma.post.findMany();
  
            res.json(posts)
        }catch(error){
            console.log(error);
            res.status(500).json({
                error: error
            })
        }
    }

    async createPost(req: Request, res: Response){
        try{
            const postData = req.body
            if(!postData.title){
                 res.status(400).json({
                    status: 400,
                    message: "Você precisa inserir um titulo",
                });
            }
            if(!postData.content){
                 res.status(400).json({
                    status: 400,
                    message: "Post não possui conteúdo.",
                });
            }
            const newPost = await prisma.post.create({
                data: postData,
            });
            
            res.json({
            status: 200,
            newuser: newPost,
            });  
        }catch(error){
            console.log(error);
            res.json({
              status: 500,
              message: error,
            });
        }
    }
    async deletePost(req: Request, res: Response){
        try{
            const postId = req.params.id

            await prisma.post.delete({
                where: {
                    id: parseInt(postId)
                },
            })
        }catch(error){
            console.log(error);
            res.json({
              status: 500,
              message: error,
            });
        }
    }
    async updatePost(req: Request, res:Response){
        try{
            const postId = req.params.id
            const postData = req.body
            if(!postData.title){
                 res.status(400).json({
                    status: 400,
                    message: "Você precisa inserir um titulo",
                });
            }
            if(!postData.content){
                 res.status(400).json({
                    status: 400,
                    message: "O post deve possuir um conteudo",
                });
            }
            await prisma.post.update({
                where:{
                    id: parseInt(postId)
                },
                data: postData
            })

        }catch(error){
            console.log(error);
            res.json({
              status: 500,
              message: error,
            });
        }
    }

}

export default new PostController();