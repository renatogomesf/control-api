import User from "../../entity/User"

export interface CreateAmountToReceiveDTO {
    date: Date
    description: string
    value: number
    idUser: User
}