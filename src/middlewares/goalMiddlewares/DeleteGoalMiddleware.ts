import { Request, Response, NextFunction } from 'express';
import { goalRepository } from '../../repositories/goalRepository';

class DeleteGoalMiddleware {
    async verifyDeleteGoal(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { idGoal, idUser } = req.params;

        const deleteGoal = await goalRepository.findOne({
            where: { idGoal: Number(idGoal), user: { idUser: Number(idUser) } },
        });

        if (!deleteGoal) {
            return res.status(404).send({ message: 'Goal not found' });
        }

        next();
    }
}

export default new DeleteGoalMiddleware();
