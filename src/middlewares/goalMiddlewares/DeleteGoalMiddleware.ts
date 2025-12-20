import { Request, Response, NextFunction } from 'express';
import { goalRepository } from '../../repositories/goalRepository';
import { GoalDTO } from './../../dtos/goalDto/goal.dto';

class DeleteGoalMiddleware {
    async verifyDeleteGoal(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { idGoal, idUser } = req.params;

        try {
            const deleteGoal: GoalDTO | null = await goalRepository.findOne({
                where: { idGoal: Number(idGoal), user: { idUser: Number(idUser) } },
            });

            if (!deleteGoal) {
                return res.status(404).send({ message: 'Goal not found' });
            }
        } catch (error) {
            return res.status(500).send({ message: 'Internal Server Error', error });
        }

        next();
    }
}

export default new DeleteGoalMiddleware();
