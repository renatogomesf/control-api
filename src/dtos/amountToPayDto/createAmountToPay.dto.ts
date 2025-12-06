import User from '../../entity/User';

export interface CreateAmountToPayDTO {
    date: string;
    name: string;
    description: string;
    value: number;
    idUser: User;
}
