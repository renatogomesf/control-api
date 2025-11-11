import { Request, Response, NextFunction } from 'express';
import { amountToPayRepository } from '../../repositories/amountToPayRepository';
import { AmountToPayDTO } from '../../dtos/amountToPayDto/amountToPay.dto';

class GetOneAmountToPayMiddleware {
    async verifyGetOneAmountToPay(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { idAmountToPay, idUser } = req.params;

        const oneAmountToPay: AmountToPayDTO | null = await amountToPayRepository.findOne({
            where: { idAmountToPay: Number(idAmountToPay), user: { idUser: Number(idUser) } },
            loadRelationIds: true,
        });

        if (!oneAmountToPay) {
            return res.status(404).send({ message: 'Amount to pay not found' });
        }

        next();
    }
}

export default new GetOneAmountToPayMiddleware();
