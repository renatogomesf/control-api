import { Request, Response, NextFunction } from 'express';
import { updateUserDTO } from '../../dtos/userDto/updateUser.dto';
import { userRepository } from '../../repositories/userRepository';
import { UserDTO } from '../../dtos/userDto/user.dto';

class UpdateUserMiddleware {
    async verifyUpdateUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { id } = req.params;
        const { name, lastName, email, password }: updateUserDTO = req.body;

        if (!name || !lastName || !email || !password) {
            return res.status(400).send({ message: 'all fields are required' });
        }

        const userExists: UserDTO | null = await userRepository.findOneBy({ idUser: Number(id) });

        if (!userExists) {
            return res.status(404).send({message: "user not found"});
        }

        next();
    }
}

export default new UpdateUserMiddleware();
