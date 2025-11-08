import User from "../../entity/User"

export interface CreateRevenueDTO {
    date: Date
    description: string
    value: number
    idUser: User
}