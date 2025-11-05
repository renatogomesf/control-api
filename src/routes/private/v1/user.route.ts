import { Router } from 'express';
import UserController from '../../../controllers/UserController';
import GetOneUserMiddleware from '../../../middlewares/userMiddlewares/GetOneUserMiddleware';
import GetAllUserMiddleware from '../../../middlewares/userMiddlewares/GetAllUserMiddleware';
import UpdateUserMiddleware from '../../../middlewares/userMiddlewares/UpdateUserMiddleware';
import DeleteUserMiddleware from '../../../middlewares/userMiddlewares/DeleteUserMiddleware';

const userRouter = Router();

userRouter.get('/user/:id', GetOneUserMiddleware.verifyGetOneUser, UserController.getOneUser);

userRouter.get('/user', GetAllUserMiddleware.verifyGetAllUser, UserController.getAllUser);

userRouter.put('/user/:id', UpdateUserMiddleware.verifyUpdateUser, UserController.updateUser);

userRouter.delete('/user/:id', DeleteUserMiddleware.verifyDeleteUser, UserController.deleteUser);

export default userRouter;
