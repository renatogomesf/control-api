import User from '../../entity/User';

export interface UpdateGoalDTO {
    goal: string;
    currentValue: number;
    totalValue: number;
}
