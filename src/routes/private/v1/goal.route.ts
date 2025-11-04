import { Router } from 'express';
import GoalController from '../../../controllers/GoalController';
import GetOneGoalMiddleware from '../../../middlewares/goalMiddlewares/GetOneGoalMiddleware';
import GetAllGoalMiddleware from '../../../middlewares/goalMiddlewares/GetAllGoalMiddleware';
import CreateGoalMiddleware from '../../../middlewares/goalMiddlewares/CreateGoalMiddleware';
import UpdateGoalMiddleware from '../../../middlewares/goalMiddlewares/UpdateGoalMiddleware';
import DeleteGoalMiddleware from '../../../middlewares/goalMiddlewares/DeleteGoalMiddleware';

const goalRouter = Router();

goalRouter.get('/getonegoal/:idGoal/:idUser', GetOneGoalMiddleware.verifyGetOneGoal, GoalController.getOneGoal);

goalRouter.get('/getallgoal', GetAllGoalMiddleware.verifyGetAllGoal, GoalController.getAllGoal);

goalRouter.post('/creategoal',CreateGoalMiddleware.verifyCreateGoal , GoalController.createGoal);

goalRouter.put('/updategoal/:idGoal/:idUser', UpdateGoalMiddleware.verifyUpdateGoal, GoalController.updateGoal);

goalRouter.delete('/deletegoal/:idGoal/:idUser', DeleteGoalMiddleware.verifyDeleteGoal, GoalController.deleteGoal);

export default goalRouter;
