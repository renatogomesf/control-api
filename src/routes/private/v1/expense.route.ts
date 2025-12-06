import { Router } from 'express';
import ExpenseController from '../../../controllers/ExpenseController';
import GetAllExpenseMiddleware from '../../../middlewares/expenseMiddlewares/GetAllExpenseMiddleware';
import CreateExpenseMiddleware from '../../../middlewares/expenseMiddlewares/CreateExpenseMiddleware';
import UpdateExpenseMiddleware from '../../../middlewares/expenseMiddlewares/UpdateExpenseMiddleware';
import DeleteExpenseMiddleware from '../../../middlewares/expenseMiddlewares/DeleteExpenseMiddleware';

const expenseRoute = Router();

expenseRoute.get('/expense/:idUser', GetAllExpenseMiddleware.verifyGetAllExpense, ExpenseController.getAllExpense);

expenseRoute.post('/expense', CreateExpenseMiddleware.verifyCreateExpense, ExpenseController.createExpense);

expenseRoute.put(
    '/expense/:idExpense/:idUser',
    UpdateExpenseMiddleware.verifyUpdateExpense,
    ExpenseController.updateExpense
);

expenseRoute.delete(
    '/expense/:idExpense/:idUser',
    DeleteExpenseMiddleware.verifyDeleteExpense,
    ExpenseController.deleteExpense
);

export default expenseRoute;
