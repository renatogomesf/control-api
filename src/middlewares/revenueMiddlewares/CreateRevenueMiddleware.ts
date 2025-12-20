import { Request, Response, NextFunction } from 'express';
import { userRepository } from '../../repositories/userRepository';
import { UserDTO } from '../../dtos/userDto/user.dto';
import { CreateRevenueDTO } from '../../dtos/revenueDto/createRevenue.dto';

class CreateRevenueMiddleware {
    async verifyCreateRevenue(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { date, description, value, idUser }: CreateRevenueDTO = req.body;

        try {
            const userExist: UserDTO | null = await userRepository.findOne({ where: { idUser: Number(idUser) } });

            if (!userExist) {
                return res.status(404).send({ message: 'User not found' });
            }

            if (!date || !description || !value) {
                return res.status(400).send({ message: 'All fields are required' });
            }
        } catch (error) {
            return res.status(500).send({ message: 'Internal Server Error', error });
        }

        next();
    }
}

export default new CreateRevenueMiddleware();
