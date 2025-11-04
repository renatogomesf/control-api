import User from '../../entity/User';

export interface CreateGoalDTO {
    goal: string;
    currentValue: number;
    totalValue: number;
    idUser: User;
}
