import User from '../../entity/User';

export interface AmountToPayDTO {
    idAmountToPay: number;
    date: Date;
    description: string;
    value: number;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
