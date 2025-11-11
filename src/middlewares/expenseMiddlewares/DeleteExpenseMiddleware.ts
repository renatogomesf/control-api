import { Request, Response, NextFunction } from 'express';
import { expenseRepository } from './../../repositories/expenseRepository';
import { ExpenseDTO } from '../../dtos/expenseDto/expense.dto';

class DeleteExpenseMiddleware {
    async verifyDeleteExpense(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { idExpense, idUser } = req.params;

        const deleteExpense: ExpenseDTO | null = await expenseRepository.findOne({
            where: { idExpense: Number(idExpense), user: { idUser: Number(idUser) } },
        });

        if (!deleteExpense) {
            return res.status(404).send({ message: 'Expense not found' });
        }

        next();
    }
}

export default new DeleteExpenseMiddleware();
