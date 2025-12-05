import User from "../../entity/User"

export interface CreateRevenueDTO {
    date: string
    description: string
    value: number
    idUser: User
}