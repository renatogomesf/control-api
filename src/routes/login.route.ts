import { Router } from "express";

import LoginController from "../controllers/LoginController";
import LoginMiddleware from "../middleware/LoginMiddleware";

const loginRoute = Router()

loginRoute.post("/login", LoginMiddleware.verifyLoginrUser, LoginController.login)

export default loginRoute