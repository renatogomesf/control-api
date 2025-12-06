import User from '../../entity/User';

export interface AmountToPayDTO {
    idAmountToPay: number;
    date: string;
    name: string;
    description: string;
    value: number;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
