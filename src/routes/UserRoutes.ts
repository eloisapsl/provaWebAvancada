import { Router } from 'express';
import UserController from '../controllers/UserController';

const UserRouter = Router();

//Listar usuários
UserRouter.get("/users", UserController.getAllUsers);

//Inserir usuários
UserRouter.post("/users/create", UserController.createUser);

//Atualizar usuários
UserRouter.put("/user/update/:id", UserController.updateUser);

//Deletar usuários
UserRouter.delete("/user/delete/:id", UserController.deleteUser);

export default UserRouter;