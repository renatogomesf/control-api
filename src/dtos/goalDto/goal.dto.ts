import User from "../../entity/User"

export interface GoalDTO {
	idGoal: number
	goal: string
	currentValue: number
	totalValue: number
	user: User
	createdAt: Date
	updatedAt: Date
}