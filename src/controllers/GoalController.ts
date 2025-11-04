import { Request, Response } from 'express';
import { goalRepository } from '../repositories/goalRepository';
import Goal from '../entity/Goal';

class GoalController {
    async getOneGoal(req: Request, res: Response): Promise<Response> {
        const { idGoal, idUser } = req.params;

        const oneGoal = await goalRepository.findOne({
            where: { idGoal: Number(idGoal), user: { idUser: Number(idUser) } },
            loadRelationIds: true,
        });

        return res.status(200).send(oneGoal);
    }

    async getAllGoal(req: Request, res: Response): Promise<Response> {
        const allGoal = await goalRepository.find({ loadRelationIds: true });

        return res.status(200).send(allGoal);
    }

    async createGoal(req: Request, res: Response): Promise<Response> {
        const { goal, currentValue, totalValue, idUser } = req.body;

        const newGoal = new Goal();

        newGoal.goal = goal;
        newGoal.currentValue = currentValue;
        newGoal.totalValue = totalValue;
        newGoal.user = idUser;

        const goalCreated = await goalRepository.save(newGoal);

        return res.status(201).send(goalCreated);
    }

    async updateGoal(req: Request, res: Response): Promise<Response> {
        const { idGoal, idUser } = req.params;
        const { goal, currentValue, totalValue } = req.body;

        const updateGoal = await goalRepository.findOne({
            where: { idGoal: Number(idGoal), user: { idUser: Number(idUser) } },
        });

        // TIPAGEM PARA REMOVER ESSE IF
        if (!updateGoal) {
            return res.status(404).send({ message: 'Goal not found' });
        }

        updateGoal.goal = goal;
        updateGoal.currentValue = currentValue;
        updateGoal.totalValue = totalValue;

        const goalUpdated = await goalRepository.save(updateGoal);

        return res.status(200).send(goalUpdated);
    }

    async deleteGoal(req: Request, res: Response): Promise<Response> {
        const { idGoal, idUser } = req.params;

        const deleteGoal = await goalRepository.findOne({
            where: { idGoal: Number(idGoal), user: { idUser: Number(idUser) } },
        });

        if (!deleteGoal) {
            return res.status(404).send({ message: 'Goal not found' });
        }

        const goalDeleted = await goalRepository.remove(deleteGoal);

        return res.status(200).send(goalDeleted);
    }
}

export default new GoalController();
