import { NextFunction, Request, Response } from 'express';
import { userRepository } from '../repositories/userRepository';
import { RegisterUserDTO } from '../dtos/register.dto';
import { UserDTO } from '../dtos/userDto/user.dto';

class RegisterMiddleware {
    async verifyRegisterUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { name, lastName, email, password }: RegisterUserDTO = req.body;

        if (!name || !lastName || !email || !password) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        try {
            const EmailExists: UserDTO | null = await userRepository.findOne({
                where: {
                    email,
                },
            });

            if (EmailExists) {
                return res.status(400).send({ message: 'Email already registered' });
            }
        } catch (error) {
            return res.status(500).send({ message: 'Internal Server Error', error });
        }

        next();
    }
}

export default new RegisterMiddleware();
