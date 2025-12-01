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
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).send({ message: 'Authorization required' });
        }

        if (typeof authorization == 'string') {
            try {
                const isValid = jwt.verify(authorization, String(process.env.JWT_KEY)) as JwtPayload;

                const { email, password }: AuthDTO = isValid;

                const userExists: UserDTO | null = await userRepository.findOne({
                    where: {
                        email,
                        password,
                    },
                });

                if (!userExists) {
                    return res.status(401).send({ message: 'Unauthorized' });
                }

                return res.status(200).send({ message: 'Authorized' });
            } catch (error) {
                return res.status(401).send({ message: error });
            }
        }
    }
}

export default new AuthRoute();
