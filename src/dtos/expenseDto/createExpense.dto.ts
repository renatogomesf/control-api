import User from "../../entity/User"

export interface CreateExpenseDTO {
    date: Date
    description: string
    value: number
    idUser: User
}