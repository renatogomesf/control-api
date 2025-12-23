import { Request, Response, NextFunction } from 'express';
import { amountToReceiveRepository } from '../../repositories/amountToReceiveRepository';
import { AmountToReceiveDTO } from '../../dtos/amountToReceiveDto/amountToReceive.dto';

class GetAllAmountToReceiveMiddleware {
    async verifyGetAllAmountToReceive(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { idUser } = req.params;

        try {
            const amountsToReceive: AmountToReceiveDTO[] | null = await amountToReceiveRepository.find({
                where: { user: { idUser: Number(idUser) } },
                loadRelationIds: true,
            });

            if (!amountsToReceive) {
                return res.status(404).send({ message: 'Amount to receive not found' });
            }
        } catch (error) {
            return res.status(500).send({ message: 'Internal Server Error', error });
        }

        next();
    }
}

export default new GetAllAmountToReceiveMiddleware();
