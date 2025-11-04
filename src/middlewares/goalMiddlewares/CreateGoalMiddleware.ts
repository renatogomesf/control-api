import { Request, Response, NextFunction } from 'express';
import { userRepository } from '../../repositories/userRepository';
import { UserDTO } from '../../dtos/userDto/user.dto';
import { CreateGoalDTO } from '../../dtos/goalDto/createGoal.dto';

class CreateGoalMiddleware {
    async verifyCreateGoal(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { goal, currentValue, totalValue, idUser }: CreateGoalDTO = req.body;

        const userExist: UserDTO | null = await userRepository.findOne({ where: { idUser: Number(idUser) } });

        if (!userExist) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (!goal || !currentValue || !totalValue) {
            return res.status(400).send({ message: 'all fields are required' });
        }

        next();
    }
}

export default new CreateGoalMiddleware();
