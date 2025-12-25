import { Request, Response, NextFunction } from 'express';
import { amountToPayRepository } from '../../repositories/amountToPayRepository';
import { AmountToPayDTO } from '../../dtos/amountToPayDto/amountToPay.dto';

class DeleteAmountToPayMiddleware {
    async verifyDeleteAmountToPay(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { idAmountToPay, idUser } = req.params;

        try {
            const deleteAmountToPay: AmountToPayDTO | null = await amountToPayRepository.findOne({
                where: { idAmountToPay: Number(idAmountToPay), user: { idUser: Number(idUser) } },
            });

            if (!deleteAmountToPay) {
                return res.status(404).send({ message: 'Amount to pay not found' });
            }
        } catch (error) {
            return res.status(500).send({ message: 'Internal Server Error', error });
        }

        next();
    }
}

export default new DeleteAmountToPayMiddleware();
