import { Request, Response, NextFunction } from 'express';
import { userRepository } from '../../repositories/userRepository';
import { UserDTO } from '../../dtos/userDto/user.dto';

class GetAllUserMiddleware {
    async verifyGetAllUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const allUser: UserDTO[] | null = await userRepository.find();

        if (!allUser) {
            return res.status(404).send({ message: 'users not found' });
        }

        next();
    }
}

export default new GetAllUserMiddleware();
