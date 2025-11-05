import { Router } from 'express';
import GoalController from '../../../controllers/GoalController';
import GetOneGoalMiddleware from '../../../middlewares/goalMiddlewares/GetOneGoalMiddleware';
import GetAllGoalMiddleware from '../../../middlewares/goalMiddlewares/GetAllGoalMiddleware';
import CreateGoalMiddleware from '../../../middlewares/goalMiddlewares/CreateGoalMiddleware';
import UpdateGoalMiddleware from '../../../middlewares/goalMiddlewares/UpdateGoalMiddleware';
import DeleteGoalMiddleware from '../../../middlewares/goalMiddlewares/DeleteGoalMiddleware';

const goalRouter = Router();

goalRouter.get('/goal/:idGoal/:idUser', GetOneGoalMiddleware.verifyGetOneGoal, GoalController.getOneGoal);

goalRouter.get('/goal', GetAllGoalMiddleware.verifyGetAllGoal, GoalController.getAllGoal);

goalRouter.post('/goal',CreateGoalMiddleware.verifyCreateGoal , GoalController.createGoal);

goalRouter.put('/goal/:idGoal/:idUser', UpdateGoalMiddleware.verifyUpdateGoal, GoalController.updateGoal);

goalRouter.delete('/goal/:idGoal/:idUser', DeleteGoalMiddleware.verifyDeleteGoal, GoalController.deleteGoal);

export default goalRouter;
