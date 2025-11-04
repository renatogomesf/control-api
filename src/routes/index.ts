import { Router } from 'express';
import authRoute from '../auth/AuthRoute';
import userRouter from './private/v1/user.route';
import goalRouter from './private/v1/goal.route';

const routerPrivate = Router();

// routerPrivate.use('/v1', authRoute.auth, userRouter);
routerPrivate.use('/v1', userRouter, goalRouter);

export default routerPrivate;
