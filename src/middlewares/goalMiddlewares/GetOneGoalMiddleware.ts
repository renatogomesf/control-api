import { Request, Response, NextFunction } from 'express';
import { goalRepository } from '../../repositories/goalRepository';
import { GoalDTO } from '../../dtos/goalDto/goal.dto';

class GetOneGoalMiddleware {
    async verifyGetOneGoal(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { idGoal, idUser } = req.params;

        const oneGoal: GoalDTO | null = await goalRepository.findOne({
            where: { idGoal: Number(idGoal), user: { idUser: Number(idUser) } },
            loadRelationIds: true,
        });

        if (!oneGoal) {
            return res.status(404).send({ message: 'Goal not found' });
        }

        next();
    }
}

export default new GetOneGoalMiddleware();
