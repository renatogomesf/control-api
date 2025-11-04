import Goal from '../../entity/Goal';

export interface UserDTO {
    idUser: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    goal?: Goal[];
    createdAt: Date;
    updatedAt: Date;
}
