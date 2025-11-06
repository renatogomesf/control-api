import { Router } from 'express';
import authRoute from '../auth/AuthRoute';
import userRouter from './private/v1/user.route';
import goalRouter from './private/v1/goal.route';
import revenueRoute from './private/v1/revenue.route';
import expenseRoute from './private/v1/expense.route';

const routerPrivate = Router();

// routerPrivate.use('/v1', authRoute.auth, userRouter);
routerPrivate.use('/v1', userRouter, goalRouter, revenueRoute, expenseRoute);

export default routerPrivate;
