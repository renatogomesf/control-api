import User from '../../entity/User';

export interface ExpenseDTO {
    idExpense: number;
    date: string;
    description: string;
    value: number;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
