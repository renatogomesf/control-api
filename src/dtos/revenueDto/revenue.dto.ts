import User from '../../entity/User';

export interface RevenueDTO {
    idRevenue: number;
    date: Date;
    description: string;
    value: number;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
