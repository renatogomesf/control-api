import { Request, Response, NextFunction } from 'express';
import { amountToReceiveRepository } from '../../repositories/amountToReceiveRepository';
import { AmountToReceiveDTO } from '../../dtos/amountToReceiveDto/amountToReceive.dto';

class GetOneAmountToReceiveMiddleware {
    async verifyGetOneAmountToReceive(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { idAmountToReceive, idUser } = req.params;

        const oneAmountToReceive: AmountToReceiveDTO | null = await amountToReceiveRepository.findOne({
            where: { idAmountToReceive: Number(idAmountToReceive), user: { idUser: Number(idUser) } },
            loadRelationIds: true,
        });

        if (!oneAmountToReceive) {
            return res.status(404).send({ message: 'Amount to receive not found' });
        }

        next();
    }
}

export default new GetOneAmountToReceiveMiddleware();
