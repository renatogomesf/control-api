import { AppDataSource } from '../data-source';
import Expense from '../entity/Expense';

export const expenseRepository = AppDataSource.getRepository(Expense);
