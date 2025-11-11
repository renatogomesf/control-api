import { Request, Response, NextFunction } from 'express';
import { expenseRepository } from '../../repositories/expenseRepository';
import { ExpenseDTO } from '../../dtos/expenseDto/expense.dto';

class GetAllExpenseMiddleware {
    async verifyGetAllExpense(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const allExpense: ExpenseDTO[] = await expenseRepository.find({ loadRelationIds: true });

        if (allExpense.length == 0) {
            return res.status(404).send({ message: 'Expense not found' });
        }

        next();
    }
}

export default new GetAllExpenseMiddleware();
