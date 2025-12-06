import { Request, Response, NextFunction } from 'express';
import { expenseRepository } from '../../repositories/expenseRepository';
import { ExpenseDTO } from '../../dtos/expenseDto/expense.dto';

class GetAllExpenseMiddleware {
    async verifyGetAllExpense(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { idUser } = req.params;

        const expenses: ExpenseDTO[] | null = await expenseRepository.find({
            where: { user: { idUser: Number(idUser) } },
            loadRelationIds: true,
        });

        if (!expenses) {
            return res.status(404).send({ message: 'Expense not found' });
        }

        next();
    }
}

export default new GetAllExpenseMiddleware();
