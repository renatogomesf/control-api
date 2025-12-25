import { Request, Response, NextFunction } from 'express';
import { amountToPayRepository } from '../../repositories/amountToPayRepository';
import { AmountToPayDTO } from '../../dtos/amountToPayDto/amountToPay.dto';
import { UpdateAmountToPayDTO } from '../../dtos/amountToPayDto/updateAmountToPay.dto';

class UpdateAmountToPayMiddleware {
    async verifyUpdateAmountToPay(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { idAmountToPay, idUser } = req.params;
        const { date, name, description, value }: UpdateAmountToPayDTO = req.body;

        try {
            const updateAmountToPay: AmountToPayDTO | null = await amountToPayRepository.findOne({
                where: { idAmountToPay: Number(idAmountToPay), user: { idUser: Number(idUser) } },
            });

            if (!updateAmountToPay) {
                return res.status(404).send({ message: 'Amount to pay not found' });
            }

            if (!date || !name || !description || !value) {
                return res.status(400).send({ message: 'All fields are required' });
            }
        } catch (error) {
            return res.status(500).send({ message: 'Internal Server Error', error });
        }

        next();
    }
}

export default new UpdateAmountToPayMiddleware();
