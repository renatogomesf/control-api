import { Request, Response } from 'express';
import User from '../entity/User';
import { userRepository } from '../repositories/userRepository';
import { RegisterUserDTO } from '../dtos/register.dto';
import { UserDTO } from '../dtos/userDto/user.dto';

class RegisterController {
    async registerUser(req: Request, res: Response): Promise<Response> {
        const { name, lastName, email, password }: RegisterUserDTO = req.body;

        const user: UserDTO = new User();

        user.name = name;
        user.lastName = lastName;
        user.email = email;
        user.password = password;

        const userCreated: UserDTO = await userRepository.save(user);

        return res.status(201).send(userCreated);
    }
}

export default new RegisterController();
