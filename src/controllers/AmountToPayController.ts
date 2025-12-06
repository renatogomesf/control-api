import { Request, Response } from 'express';
import { amountToPayRepository } from '../repositories/amountToPayRepository';
import AmountToPay from '../entity/AmountToPay';
import { AmountToPayDTO } from '../dtos/amountToPayDto/amountToPay.dto';
import { CreateAmountToPayDTO } from '../dtos/amountToPayDto/createAmountToPay.dto';
import { UpdateAmountToPayDTO } from '../dtos/amountToPayDto/updateAmountToPay.dto';

class AmountToPayController {
    async getAllAmountToPay(req: Request, res: Response): Promise<Response> {
        const { idUser } = req.params;

        const amountsToPay = (await amountToPayRepository.find({
            where: { user: { idUser: Number(idUser) } },
            loadRelationIds: true,
        })) as AmountToPayDTO[];

        return res.status(200).send(amountsToPay);
    }

    async createAmountToPay(req: Request, res: Response): Promise<Response> {
        const { date, name, description, value, idUser }: CreateAmountToPayDTO = req.body;

        const newAmountToPay = new AmountToPay();

        newAmountToPay.date = date;
        newAmountToPay.name = name;
        newAmountToPay.description = description;
        newAmountToPay.value = value;
        newAmountToPay.user = idUser;

        const amountToPayCreated: AmountToPayDTO = await amountToPayRepository.save(newAmountToPay);

        return res.status(201).send(amountToPayCreated);
    }

    async updateAmountToPay(req: Request, res: Response): Promise<Response> {
        const { idAmountToPay, idUser } = req.params;
        const { date, name, description, value }: UpdateAmountToPayDTO = req.body;

        const updateAmountToPay = (await amountToPayRepository.findOne({
            where: { idAmountToPay: Number(idAmountToPay), user: { idUser: Number(idUser) } },
        })) as AmountToPayDTO;

        updateAmountToPay.date = date;
        updateAmountToPay.name = name;
        updateAmountToPay.description = description;
        updateAmountToPay.value = value;

        const amountToPayUpdated: AmountToPayDTO = await amountToPayRepository.save(updateAmountToPay);

        return res.status(200).send(amountToPayUpdated);
    }

    async deleteAmountToPay(req: Request, res: Response): Promise<Response> {
        const { idAmountToPay, idUser } = req.params;

        const deleteAmountToPay = (await amountToPayRepository.findOne({
            where: { idAmountToPay: Number(idAmountToPay), user: { idUser: Number(idUser) } },
        })) as AmountToPayDTO;

        const amountToPayDeleted: AmountToPayDTO = await amountToPayRepository.remove(deleteAmountToPay);

        return res.status(200).send(amountToPayDeleted);
    }
}

export default new AmountToPayController();
