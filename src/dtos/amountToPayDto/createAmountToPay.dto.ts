import User from '../../entity/User';

export interface CreateAmountToPayDTO {
    date: Date;
    description: string;
    value: number;
    idUser: User;
}
