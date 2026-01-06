import { Request, Response } from 'express';
import User from '../entity/User';
import { userRepository } from '../repositories/userRepository';
import { RegisterUserDTO } from '../dtos/register.dto';
import { UserDTO } from '../dtos/userDto/user.dto';

import { hash } from 'bcrypt';
import { randomInt } from 'crypto';

class RegisterController {
    async registerUser(req: Request, res: Response): Promise<Response> {
        const { name, lastName, email, password }: RegisterUserDTO = req.body;

        const randomSalt = randomInt(10, 16);

        const passwordHash = await hash(password, randomSalt);

        try {
            const user: UserDTO = new User();

            user.name = name;
            user.lastName = lastName;
            user.email = email;
            user.password = passwordHash;

            const userCreated: UserDTO = await userRepository.save(user);

            return res
                .status(201)
                .send({
                    idUser: userCreated.idUser,
                    name: userCreated.name,
                    lastName: userCreated.lastName,
                    email: userCreated.email,
                });
        } catch (error) {
            return res.status(500).send({ message: 'Internal Server Error', error });
        }
    }
}

export default new RegisterController();
