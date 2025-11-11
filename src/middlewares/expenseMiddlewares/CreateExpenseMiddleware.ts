import { Request, Response, NextFunction } from 'express';
import { userRepository } from '../../repositories/userRepository';
import { UserDTO } from '../../dtos/userDto/user.dto';
import { CreateExpenseDTO } from '../../dtos/expenseDto/createExpense.dto';

class CreateExpenseMiddleware {
    async verifyCreateExpense(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { date, description, value, idUser }: CreateExpenseDTO = req.body;

        const userExist: UserDTO | null = await userRepository.findOne({ where: { idUser: Number(idUser) } });

        if (!userExist) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (!date || !description || !value) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        next();
    }
}

export default new CreateExpenseMiddleware();
