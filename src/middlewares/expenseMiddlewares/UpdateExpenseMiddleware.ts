import { Request, Response, NextFunction } from 'express';
import { expenseRepository } from '../../repositories/expenseRepository';
import { ExpenseDTO } from '../../dtos/expenseDto/expense.dto';
import { UpdateExpenseDTO } from '../../dtos/expenseDto/updateExpense.dto';

class UpdateExpenseMiddleware {
    async verifyUpdateExpense(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { idExpense, idUser } = req.params;
        const { date, description, value }: UpdateExpenseDTO = req.body;

        try {
            const updateExpense: ExpenseDTO | null = await expenseRepository.findOne({
                where: { idExpense: Number(idExpense), user: { idUser: Number(idUser) } },
            });

            if (!updateExpense) {
                return res.status(404).send({ message: 'Expense not found' });
            }

            if (!date || !description || !value) {
                return res.status(400).send({ message: 'All fields are required' });
            }
        } catch (error) {
            return res.status(500).send({ message: 'Internal Server Error', error });
        }

        next();
    }
}

export default new UpdateExpenseMiddleware();
