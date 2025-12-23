import { Request, Response, NextFunction } from 'express';
import { amountToReceiveRepository } from './../../repositories/amountToReceiveRepository';
import { AmountToReceiveDTO } from '../../dtos/amountToReceiveDto/amountToReceive.dto';

class DeleteAmountToReceiveMiddleware {
    async verifyDeleteAmountToReceive(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { idAmountToReceive, idUser } = req.params;

        try {
            const deleteAmountToReceive: AmountToReceiveDTO | null = await amountToReceiveRepository.findOne({
                where: { idAmountToReceive: Number(idAmountToReceive), user: { idUser: Number(idUser) } },
            });

            if (!deleteAmountToReceive) {
                return res.status(404).send({ message: 'Amount to receive not found' });
            }
        } catch (error) {
            return res.status(500).send({ message: 'Internal Server Error', error });
        }

        next();
    }
}

export default new DeleteAmountToReceiveMiddleware();
