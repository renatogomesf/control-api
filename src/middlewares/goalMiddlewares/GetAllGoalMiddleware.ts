import { Request, Response, NextFunction } from 'express';
import { goalRepository } from '../../repositories/goalRepository';
import { GoalDTO } from '../../dtos/goalDto/goal.dto';

class GetAllGoalMiddleware {
    async verifyGetAllGoal(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const allGoal: GoalDTO[] = await goalRepository.find({ loadRelationIds: true });

        if (allGoal.length == 0) {
            return res.status(404).send({ message: 'goals not found' });
        }

        next();
    }
}

export default new GetAllGoalMiddleware();
