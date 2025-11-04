import { Router } from 'express';
import GoalController from '../../../controllers/GoalController';

const goalRouter = Router();

goalRouter.get('/getonegoal/:idGoal/:idUser', GoalController.getOneGoal);

goalRouter.get('/getallgoal', GoalController.getAllGoal);

goalRouter.post('/creategoal', GoalController.createGoal);

// goalRouter.put('/updategoal/:id');

// goalRouter.delete('/deletegoal/:id');

export default goalRouter;
