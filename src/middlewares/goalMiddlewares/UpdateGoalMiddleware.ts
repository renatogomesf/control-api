import { Request, Response, NextFunction } from 'express';
import { goalRepository } from '../../repositories/goalRepository';

class UpdateGoalMiddleware {
    async verifyUpdateGoal(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { idGoal, idUser } = req.params;
        const { goal, currentValue, totalValue } = req.body;

        const updateGoal = await goalRepository.findOne({
            where: { idGoal: Number(idGoal), user: { idUser: Number(idUser) } },
        });

        if (!updateGoal) {
            return res.status(404).send({ message: 'Goal not found' });
        }

        if (!goal || !currentValue || !totalValue) {
            return res.status(400).send({ message: 'all fields are required' });
        }

        next();
    }
}

export default new UpdateGoalMiddleware();
