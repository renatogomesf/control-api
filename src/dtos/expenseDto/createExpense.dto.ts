import User from "../../entity/User"

export interface CreateExpenseDTO {
    date: string
    description: string
    value: number
    idUser: User
}