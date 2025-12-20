import { Request, Response } from 'express';
import { userRepository } from '../repositories/userRepository';
import { LoginUserDTO } from '../dtos/login.dto';
import { UserDTO } from '../dtos/userDto/user.dto';

import jwt from 'jsonwebtoken';

class LoginController {
    async login(req: Request, res: Response): Promise<Response> {
        const { email, password }: LoginUserDTO = req.body;

        try {
            const userExists: UserDTO | null = await userRepository.findOne({
                where: {
                    email,
                    password,
                },
            });

            if (userExists) {
                const token: string = jwt.sign({ email, password }, String(process.env.JWT_KEY), {
                    expiresIn: 600,
                });

                return res.status(200).send({
                    token: token,
                    user: {
                        idUser: userExists.idUser,
                        name: userExists.name,
                        lastName: userExists.lastName,
                        email: userExists.email,
                    },
                });
            } else {
                return res.status(401).send({ message: 'Incorrect email or password' });
            }
        } catch (error) {
            return res.status(500).send({ message: 'Internal Server Error', error });
        }
    }
}

export default new LoginController();
