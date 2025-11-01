import { Router } from 'express';
import UserController from '../../../controllers/UserController';
import GetOneUserMiddleware from '../../../middlewares/userMiddlewares/GetOneUserMiddleware';
import GetAllUserMiddleware from '../../../middlewares/userMiddlewares/GetAllUserMiddleware';
import UpdateUserMiddleware from '../../../middlewares/userMiddlewares/UpdateUserMiddleware';
import DeleteUserMiddleware from '../../../middlewares/userMiddlewares/DeleteUserMiddleware';

const userRouter = Router();

userRouter.get('/getoneuser/:id', GetOneUserMiddleware.verifyGetOneUser, UserController.getOneUser);

userRouter.get('/getalluser', GetAllUserMiddleware.verifyGetAllUser, UserController.getAllUser);

userRouter.put('/updateuser/:id', UpdateUserMiddleware.verifyUpdateUser, UserController.updateUser);

userRouter.delete('/deleteuser/:id', DeleteUserMiddleware.verifyDeleteUser, UserController.deleteUser);

export default userRouter;
