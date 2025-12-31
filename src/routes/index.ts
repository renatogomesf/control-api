import { Router } from 'express';
import authRoute from '../auth/AuthRoute';
import userRouter from './private/v1/user.route';
import goalRouter from './private/v1/goal.route';
import revenueRoute from './private/v1/revenue.route';
import expenseRoute from './private/v1/expense.route';
import amountToReceiveRoute from './private/v1/amountToReceive.route';
import amountToPayRoute from './private/v1/amountToPay.route';

const routerPrivate = Router();

routerPrivate.use('/v1',authRoute.auth, userRouter, goalRouter, revenueRoute, expenseRoute, amountToReceiveRoute, amountToPayRoute);
routerPrivate.use('/test_route', userRouter, goalRouter, revenueRoute, expenseRoute, amountToReceiveRoute, amountToPayRoute);

export default routerPrivate;
