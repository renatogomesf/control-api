import { Request, Response } from 'express';
import { goalRepository } from '../repositories/goalRepository';
import { userRepository } from '../repositories/userRepository';
import Goal from '../entity/Goal';

class GoalController {
    async getOneGoal(req: Request, res: Response): Promise<Response> {
        const { idGoal, idUser } = req.params;

        const oneGoal = await goalRepository.findOne({
            where: { idGoal: Number(idGoal), user: { idUser: Number(idUser) } },
            loadRelationIds: true,
        });

        if (!oneGoal) {
            return res.status(404).send({ message: 'Goal not found' });
        }

        return res.status(200).send(oneGoal);
    }

    async getAllGoal(req: Request, res: Response): Promise<Response> {
        const allGoal = await goalRepository.find({ loadRelationIds: true });

        return res.status(200).send(allGoal);
    }

    async createGoal(req: Request, res: Response): Promise<Response> {
        const { goal, currentValue, totalValue, idUser } = req.body;

        const userExist = await userRepository.findOne({ where: { idUser: Number(idUser) } });

        if (!userExist) {
            return res.status(404).send({ message: 'User not found' });
        }

        const newGoal = new Goal();

        newGoal.goal = goal;
        newGoal.currentValue = currentValue;
        newGoal.totalValue = totalValue;
        newGoal.user = idUser;

        const goalCreated = await goalRepository.save(newGoal);

        return res.status(201).send(goalCreated);
    }
}

export default new GoalController();
