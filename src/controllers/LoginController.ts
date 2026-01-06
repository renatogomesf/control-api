import { Request, Response } from 'express';
import { userRepository } from '../repositories/userRepository';
import { LoginUserDTO } from '../dtos/login.dto';
import { UserDTO } from '../dtos/userDto/user.dto';

import { compare } from 'bcrypt';

import jwt from 'jsonwebtoken';

class LoginController {
    async login(req: Request, res: Response): Promise<Response> {
        const { email, password }: LoginUserDTO = req.body;

        try {
            const user: UserDTO | null = await userRepository.findOne({
                where: {
                    email,
                },
            });

            if (user) {
                const isValidPassword = await compare(password, user?.password);

                if (isValidPassword) {
                    const token: string = jwt.sign(
                        { idUser: user.idUser, name: user.name, lastName: user.lastName, email: user.email },
                        String(process.env.JWT_KEY),
                        {
                            expiresIn: 600,
                        }
                    );

                    return res.status(200).send({
                        token: token,
                        user: {
                            idUser: user.idUser,
                            name: user.name,
                            lastName: user.lastName,
                            email: user.email,
                        },
                    });
                } else {
                    return res.status(401).send({ message: 'Incorrect email or password' });
                }
            } else {
                return res.status(401).send({ message: 'Incorrect email or password' });
            }
        } catch (error) {
            return res.status(500).send({ message: 'Internal Server Error', error });
        }
    }
}

export default new LoginController();
