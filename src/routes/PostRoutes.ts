import { Router } from 'express';
import PostController from '../controllers/PostController';

const PostRouter = Router();


PostRouter.get("/posts", PostController.listPosts);
PostRouter.post("/post/create", PostController.createPost);
PostRouter.put("/post/update/:id", PostController.updatePost);
PostRouter.delete("/post/delete/:id", PostController.deletePost);

export default PostRouter;