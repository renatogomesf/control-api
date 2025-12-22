import { Request, Response, NextFunction } from 'express';
import { expenseRepository } from '../../repositories/expenseRepository';
import { ExpenseDTO } from '../../dtos/expenseDto/expense.dto';

class GetAllExpenseMiddleware {
    async verifyGetAllExpense(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { idUser } = req.params;

        try {
            const expenses: ExpenseDTO[] | null = await expenseRepository.find({
                where: { user: { idUser: Number(idUser) } },
                loadRelationIds: true,
            });

            if (!expenses) {
                return res.status(404).send({ message: 'Expense not found' });
            }
        } catch (error) {
            return res.status(500).send({ message: 'Internal Server Error', error });
        }

        next();
    }
}

export default new GetAllExpenseMiddleware();
