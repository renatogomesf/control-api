import User from '../../entity/User';

export interface RevenueDTO {
    idRevenue: number;
    date: string;
    description: string;
    value: number;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
