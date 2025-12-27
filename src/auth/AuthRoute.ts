import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { userRepository } from '../repositories/userRepository';
import { AuthDTO } from '../dtos/auth.dto';
import { UserDTO } from '../dtos/userDto/user.dto';

interface JwtPayload {
    email: string;
    password: string;
}

class AuthRoute {
    async auth(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const Authorization = req.headers.authorization;

        if (!Authorization) {
            return res.status(401).send({ message: 'Authorization required' });
        }

        if (typeof Authorization == 'string') {
            try {
                const isValid = jwt.verify(Authorization, String(process.env.JWT_KEY)) as JwtPayload;

                const { email, password }: AuthDTO = isValid;

                const userExists: UserDTO | null = await userRepository.findOne({
                    where: {
                        email,
                        password,
                    },
                });

                if (!userExists) {
                    return res.status(401).send({ message: 'Unauthorized' });
                } else {
                    next();
                }
            } catch (error) {
                return res.status(400).send({ message: error });
            }
        }
    }
}

export default new AuthRoute();
