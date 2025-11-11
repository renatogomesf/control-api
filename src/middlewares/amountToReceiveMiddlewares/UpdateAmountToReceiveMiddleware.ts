import { Request, Response, NextFunction } from 'express';
import { amountToReceiveRepository } from './../../repositories/amountToReceiveRepository';
import { AmountToReceiveDTO } from '../../dtos/amountToReceiveDto/amountToReceive.dto';
import { UpdateAmountToReceiveDTO } from './../../dtos/amountToReceiveDto/updateAmountToReceive.dto';

class UpdateAmountToReceiveMiddleware {
    async verifyUpdateAmountToReceive(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { idAmountToReceive, idUser } = req.params;
        const { date, description, value }: UpdateAmountToReceiveDTO = req.body;

        const updateAmountToReceive: AmountToReceiveDTO | null = await amountToReceiveRepository.findOne({
            where: { idAmountToReceive: Number(idAmountToReceive), user: { idUser: Number(idUser) } },
        });

        if (!updateAmountToReceive) {
            return res.status(404).send({ message: 'Amount to receive not found' });
        }

        if (!date || !description || !value) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        next();
    }
}

export default new UpdateAmountToReceiveMiddleware();
