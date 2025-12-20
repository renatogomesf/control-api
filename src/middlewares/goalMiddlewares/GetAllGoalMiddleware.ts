import { Request, Response, NextFunction } from 'express';
import { goalRepository } from '../../repositories/goalRepository';
import { GoalDTO } from '../../dtos/goalDto/goal.dto';

class GetAllGoalMiddleware {
    async verifyGetAllGoal(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { idUser } = req.params;

        try {
            const goals: GoalDTO[] | null = await goalRepository.find({
                where: { user: { idUser: Number(idUser) } },
            });

            if (!goals) {
                return res.status(404).send({ message: 'Goal not found' });
            }
        } catch (error) {
            return res.status(500).send({ message: 'Internal Server Error', error });
        }

        next();
    }
}

export default new GetAllGoalMiddleware();
