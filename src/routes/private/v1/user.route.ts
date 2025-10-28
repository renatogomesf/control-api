import { Router } from "express";
import UserController from "../../../controllers/UserController";

const userRouter = Router();

userRouter.get("/getoneuser/:id", UserController.getOneUser);

userRouter.get("/getalluser", UserController.getAllUser);

userRouter.put("/updateuser/:id", UserController.updateUser);

userRouter.delete("/deleteuser/:id", UserController.deleteUser);

export default userRouter;
