import { Request, Response, NextFunction } from 'express';
import { userRepository } from '../../repositories/userRepository';
import { UserDTO } from '../../dtos/userDto/user.dto';
import { CreateAmountToReceiveDTO } from '../../dtos/amountToReceiveDto/createAmountToReceive.dto';

class CreateAmountToReceiveMiddleware {
    async verifyCreateAmountToReceive(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { date, name, description, value, idUser }: CreateAmountToReceiveDTO = req.body;

        try {
            const userExist: UserDTO | null = await userRepository.findOne({ where: { idUser: Number(idUser) } });

            if (!userExist) {
                return res.status(404).send({ message: 'User not found' });
            }

            if (!date || !name || !description || !value) {
                return res.status(400).send({ message: 'All fields are required' });
            }
        } catch (error) {
            return res.status(500).send({ message: 'Internal Server Error', error });
        }

        next();
    }
}

export default new CreateAmountToReceiveMiddleware();
