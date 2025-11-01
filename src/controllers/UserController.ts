import { Request, Response } from 'express';
import { userRepository } from '../repositories/userRepository';
import { UserDTO } from '../dtos/userDto/user.dto';
import { updateUserDTO } from '../dtos/userDto/updateUser.dto';

class UserController {
    async getOneUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const oneUser = await userRepository.findOneBy({ idUser: Number(id) }) as UserDTO;

        return res.status(200).send(oneUser);
    }

    async getAllUser(req: Request, res: Response): Promise<Response> {
        const allUser: UserDTO[] = await userRepository.find();

        return res.status(200).send(allUser);
    }

    async updateUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { name, lastName, email, password }: updateUserDTO = req.body;

        const updateUser = await userRepository.findOneBy({ idUser: Number(id) }) as UserDTO;

        updateUser.name = name;
        updateUser.lastName = lastName;
        updateUser.email = email;
        updateUser.password = password;

        const userUpdated: UserDTO = await userRepository.save(updateUser);

        return res.status(200).send(userUpdated);
    }

    async deleteUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const deleteUser = await userRepository.findOneBy({ idUser: Number(id) }) as UserDTO;

        const userDeleted: UserDTO = await userRepository.remove(deleteUser);
        
        return res.status(200).send(userDeleted);
    }
}

export default new UserController();
