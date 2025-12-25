import { Request, Response, NextFunction } from 'express';
import { amountToPayRepository } from '../../repositories/amountToPayRepository';
import { AmountToPayDTO } from '../../dtos/amountToPayDto/amountToPay.dto';

class GetAllAmountToPayMiddleware {
    async verifyGetAllAmountToPay(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { idUser } = req.params;

        try {
            const amountsToPay: AmountToPayDTO[] | null = await amountToPayRepository.find({
                where: { user: { idUser: Number(idUser) } },
                loadRelationIds: true,
            });

            if (!amountsToPay) {
                return res.status(404).send({ message: 'Amount to pay not found' });
            }
        } catch (error) {
            return res.status(500).send({ message: 'Internal Server Error', error });
        }

        next();
    }
}

export default new GetAllAmountToPayMiddleware();
