import { Router } from 'express';
import userRouter from './private/v1/user.route';
import authRoute from '../auth/AuthRoute';

const routerPrivate = Router();

// routerPrivate.use('/v1', authRoute.auth, userRouter);
routerPrivate.use('/v1', userRouter);

export default routerPrivate;
