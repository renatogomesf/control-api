import { Router } from 'express';
import RegisterController from '../controllers/RegisterController';
import RegisterMiddleware from '../middleware/RegisterMiddleware';

const registerRoute = Router();

registerRoute.post('/register', RegisterMiddleware.verifyRegisterUser, RegisterController.registerUser);

export default registerRoute;
