import { Request, Response, NextFunction } from 'express';
import { goalRepository } from '../../repositories/goalRepository';
import { GoalDTO } from '../../dtos/goalDto/goal.dto';
import { UpdateGoalDTO } from '../../dtos/goalDto/updateGoal.dto';

class UpdateGoalMiddleware {
    async verifyUpdateGoal(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { idGoal, idUser } = req.params;
        const { goal, currentValue, totalValue }: UpdateGoalDTO = req.body;

        const updateGoal: GoalDTO | null = await goalRepository.findOne({
            where: { idGoal: Number(idGoal), user: { idUser: Number(idUser) } },
        });

        if (!updateGoal) {
            return res.status(404).send({ message: 'Goal not found' });
        }

        if (!goal || !currentValue || !totalValue) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        next();
    }
}

export default new UpdateGoalMiddleware();
