import User from "../../entity/User"

export interface CreateAmountToReceiveDTO {
    date: string;
    name: string;
    description: string
    value: number
    idUser: User
}