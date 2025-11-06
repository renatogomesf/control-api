import { Router } from 'express';
import ExpenseController from '../../../controllers/ExpenseController';

const expenseRoute = Router();

expenseRoute.get('/expense/:idExpense/:idUser', ExpenseController.getOneExpense);

expenseRoute.get('/expense', ExpenseController.getAllExpense);

expenseRoute.post('/expense', ExpenseController.createExpense);

expenseRoute.put('/expense/:idExpense/:idUser', ExpenseController.updateExpense);

expenseRoute.delete('/expense/:idExpense/:idUser', ExpenseController.deleteExpense);

export default expenseRoute;
