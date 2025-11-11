import { Request, Response, NextFunction } from 'express';
import { amountToReceiveRepository } from '../../repositories/amountToReceiveRepository';
import { AmountToReceiveDTO } from '../../dtos/amountToReceiveDto/amountToReceive.dto';

class GetAllAmountToReceiveMiddleware {
    async verifyGetAllAmountToReceive(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const allAmountToReceive: AmountToReceiveDTO[] = await amountToReceiveRepository.find({
            loadRelationIds: true,
        });

        if (allAmountToReceive.length == 0) {
            return res.status(404).send({ message: 'Amount to receive not found' });
        }

        next();
    }
}

export default new GetAllAmountToReceiveMiddleware();
