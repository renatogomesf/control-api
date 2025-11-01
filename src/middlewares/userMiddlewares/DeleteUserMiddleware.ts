import { Request, Response, NextFunction } from 'express';
import { userRepository } from '../../repositories/userRepository';
import { UserDTO } from '../../dtos/userDto/user.dto';

class DeleteUserMiddleware {
    async verifyDeleteUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { id } = req.params;

        const deleteUser: UserDTO | null = await userRepository.findOneBy({ idUser: Number(id) });

        if (!deleteUser) {
            return res.status(404).send({ message: 'user not found' });
        }

        next();
    }
}

export default new DeleteUserMiddleware();
