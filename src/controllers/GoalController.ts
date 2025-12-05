import { Request, Response } from 'express';
import { goalRepository } from '../repositories/goalRepository';
import Goal from '../entity/Goal';
import { GoalDTO } from '../dtos/goalDto/goal.dto';
import { CreateGoalDTO } from '../dtos/goalDto/createGoal.dto';
import { UpdateGoalDTO } from '../dtos/goalDto/updateGoal.dto';

class GoalController {
    async getAllGoal(req: Request, res: Response): Promise<Response> {
        const { idUser } = req.params;

        const goals = (await goalRepository.find({
            where: { user: { idUser: Number(idUser) } },
            loadRelationIds: true,
        })) as GoalDTO[];

        return res.status(200).send(goals);
    }

    async createGoal(req: Request, res: Response): Promise<Response> {
        const { goal, currentValue, totalValue, idUser }: CreateGoalDTO = req.body;

        const newGoal = new Goal();

        newGoal.goal = goal;
        newGoal.currentValue = currentValue;
        newGoal.totalValue = totalValue;
        newGoal.user = idUser;

        const goalCreated: GoalDTO = await goalRepository.save(newGoal);

        return res.status(201).send(goalCreated);
    }

    async updateGoal(req: Request, res: Response): Promise<Response> {
        const { idGoal, idUser } = req.params;
        const { goal, currentValue, totalValue }: UpdateGoalDTO = req.body;

        const updateGoal = (await goalRepository.findOne({
            where: { idGoal: Number(idGoal), user: { idUser: Number(idUser) } },
        })) as GoalDTO;

        updateGoal.goal = goal;
        updateGoal.currentValue = currentValue;
        updateGoal.totalValue = totalValue;

        const goalUpdated: GoalDTO = await goalRepository.save(updateGoal);

        return res.status(200).send(goalUpdated);
    }

    async deleteGoal(req: Request, res: Response): Promise<Response> {
        const { idGoal, idUser } = req.params;

        const deleteGoal = (await goalRepository.findOne({
            where: { idGoal: Number(idGoal), user: { idUser: Number(idUser) } },
        })) as GoalDTO;

        const goalDeleted: GoalDTO = await goalRepository.remove(deleteGoal);

        return res.status(200).send(goalDeleted);
    }
}

export default new GoalController();
