import { Request, Response, NextFunction } from 'express';
import { expenseRepository } from '../../repositories/expenseRepository';
import { ExpenseDTO } from '../../dtos/expenseDto/expense.dto';

class GetOneExpenseMiddleware {
    async verifyGetOneExpense(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { idExpense, idUser } = req.params;

        const oneExpense: ExpenseDTO | null = await expenseRepository.findOne({
            where: { idExpense: Number(idExpense), user: { idUser: Number(idUser) } },
            loadRelationIds: true,
        });

        if (!oneExpense) {
            return res.status(404).send({ message: 'Expense not found' });
        }

        next();
    }
}

export default new GetOneExpenseMiddleware();
