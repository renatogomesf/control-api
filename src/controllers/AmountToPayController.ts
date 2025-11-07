import { Request, Response } from 'express';
import { amountToPayRepository } from '../repositories/amountToPayRepository';
import AmountToPay from '../entity/AmountToPay';

class AmountToPayController {
    async getOneAmountToPay(req: Request, res: Response): Promise<Response> {
        const { idAmountToPay, idUser } = req.params;

        const oneAmountToPay = await amountToPayRepository.findOne({
            where: { idAmountToPay: Number(idAmountToPay), user: { idUser: Number(idUser) } },
            loadRelationIds: true,
        });

        return res.status(200).send(oneAmountToPay);
    }

    async getAllAmountToPay(req: Request, res: Response): Promise<Response> {
        const allAmountToPay = await amountToPayRepository.find({ loadRelationIds: true });

        return res.status(200).send(allAmountToPay);
    }

    async createAmountToPay(req: Request, res: Response): Promise<Response> {
        const { date, description, value, idUser } = req.body;

        const newAmountToPay = new AmountToPay();

        newAmountToPay.date = date;
        newAmountToPay.description = description;
        newAmountToPay.value = value;
        newAmountToPay.user = idUser;

        const amountToPayCreated = await amountToPayRepository.save(newAmountToPay);

        return res.status(201).send(amountToPayCreated);
    }

    async updateAmountToPay(req: Request, res: Response): Promise<Response> {
        const { idAmountToPay, idUser } = req.params;
        const { date, description, value } = req.body;

        const updateAmountToPay = await amountToPayRepository.findOne({
            where: { idAmountToPay: Number(idAmountToPay), user: { idUser: Number(idUser) } },
        });

        if (!updateAmountToPay) {
            return res.status(404).send({ message: 'Amount to pay not found' });
        }

        updateAmountToPay.date = date;
        updateAmountToPay.description = description;
        updateAmountToPay.value = value;

        const amountToPayUpdated = await amountToPayRepository.save(updateAmountToPay);

        return res.status(200).send(amountToPayUpdated);
    }

    async deleteAmountToPay(req: Request, res: Response): Promise<Response> {
        const { idAmountToPay, idUser } = req.params;

        const deleteAmountToPay = await amountToPayRepository.findOne({
            where: { idAmountToPay: Number(idAmountToPay), user: { idUser: Number(idUser) } },
        });

        if (!deleteAmountToPay) {
            return res.status(404).send({ message: 'Amount to pay not found' });
        }

        const amountToPayDeleted = await amountToPayRepository.remove(deleteAmountToPay);

        return res.status(200).send(amountToPayDeleted);
    }
}

export default new AmountToPayController();
