import { Request, Response } from 'express';
import { expenseRepository } from '../repositories/expenseRepository';
import Expense from '../entity/Expense';
import { ExpenseDTO } from '../dtos/expenseDto/expense.dto';
import { CreateExpenseDTO } from '../dtos/expenseDto/createExpense.dto';
import { UpdateExpenseDTO } from '../dtos/expenseDto/updateExpense.dto';

class ExpenseController {
    async getOneExpense(req: Request, res: Response): Promise<Response> {
        const { idExpense, idUser } = req.params;

        const oneExpense = (await expenseRepository.findOne({
            where: { idExpense: Number(idExpense), user: { idUser: Number(idUser) } },
            loadRelationIds: true,
        })) as ExpenseDTO;

        return res.status(200).send(oneExpense);
    }

    async getAllExpense(req: Request, res: Response): Promise<Response> {
        const allExpense: ExpenseDTO[] = await expenseRepository.find({ loadRelationIds: true });

        return res.status(200).send(allExpense);
    }

    async createExpense(req: Request, res: Response): Promise<Response> {
        const { date, description, value, idUser }: CreateExpenseDTO = req.body;

        const newExpense = new Expense();

        newExpense.date = date;
        newExpense.description = description;
        newExpense.value = value;
        newExpense.user = idUser;

        const expenseCreated: ExpenseDTO = await expenseRepository.save(newExpense);

        return res.status(201).send(expenseCreated);
    }

    async updateExpense(req: Request, res: Response): Promise<Response> {
        const { idExpense, idUser } = req.params;
        const { date, description, value }: UpdateExpenseDTO = req.body;

        const updateExpense = (await expenseRepository.findOne({
            where: { idExpense: Number(idExpense), user: { idUser: Number(idUser) } },
        })) as ExpenseDTO;

        updateExpense.date = date;
        updateExpense.description = description;
        updateExpense.value = value;

        const expenseUpdated: ExpenseDTO = await expenseRepository.save(updateExpense);

        return res.status(200).send(expenseUpdated);
    }

    async deleteExpense(req: Request, res: Response): Promise<Response> {
        const { idExpense, idUser } = req.params;

        const deleteExpense = (await expenseRepository.findOne({
            where: { idExpense: Number(idExpense), user: { idUser: Number(idUser) } },
        })) as ExpenseDTO;

        const expenseDeleted: ExpenseDTO = await expenseRepository.remove(deleteExpense);

        return res.status(200).send(expenseDeleted);
    }
}

export default new ExpenseController();
