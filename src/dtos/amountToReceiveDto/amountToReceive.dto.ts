import User from '../../entity/User';

export interface AmountToReceiveDTO {
    idAmountToReceive: number;
    date: Date;
    description: string;
    value: number;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
