import { Request, Response } from 'express';
import { amountToReceiveRepository } from '../repositories/amountToReceiveRepository';
import AmountToReceive from '../entity/AmountToReceive';
import { AmountToReceiveDTO } from '../dtos/amountToReceiveDto/amountToReceive.dto';
import { CreateAmountToReceiveDTO } from '../dtos/amountToReceiveDto/createAmountToReceive.dto';
import { UpdateAmountToReceiveDTO } from '../dtos/amountToReceiveDto/updateAmountToReceive.dto';

class AmountToReceiveController {
    async getOneAmountToReceive(req: Request, res: Response): Promise<Response> {
        const { idAmountToReceive, idUser } = req.params;

        const oneAmountToReceive = (await amountToReceiveRepository.findOne({
            where: { idAmountToReceive: Number(idAmountToReceive), user: { idUser: Number(idUser) } },
            loadRelationIds: true,
        })) as AmountToReceiveDTO;

        return res.status(200).send(oneAmountToReceive);
    }

    async getAllAmountToReceive(req: Request, res: Response): Promise<Response> {
        const allAmountToReceive: AmountToReceiveDTO[] = await amountToReceiveRepository.find({
            loadRelationIds: true,
        });

        return res.status(200).send(allAmountToReceive);
    }

    async createAmountToReceive(req: Request, res: Response): Promise<Response> {
        const { date, description, value, idUser }: CreateAmountToReceiveDTO = req.body;

        const newAmountToReceive = new AmountToReceive();

        newAmountToReceive.date = date;
        newAmountToReceive.description = description;
        newAmountToReceive.value = value;
        newAmountToReceive.user = idUser;

        const amountToReceiveCreated: AmountToReceiveDTO = await amountToReceiveRepository.save(newAmountToReceive);

        return res.status(201).send(amountToReceiveCreated);
    }

    async updateAmountToReceive(req: Request, res: Response): Promise<Response> {
        const { idAmountToReceive, idUser } = req.params;
        const { date, description, value }: UpdateAmountToReceiveDTO = req.body;

        const updateAmountToReceive = (await amountToReceiveRepository.findOne({
            where: { idAmountToReceive: Number(idAmountToReceive), user: { idUser: Number(idUser) } },
        })) as AmountToReceiveDTO;

        updateAmountToReceive.date = date;
        updateAmountToReceive.description = description;
        updateAmountToReceive.value = value;

        const amountToReceiveUpdated: AmountToReceiveDTO = await amountToReceiveRepository.save(updateAmountToReceive);

        return res.status(200).send(amountToReceiveUpdated);
    }

    async deleteAmountToReceive(req: Request, res: Response): Promise<Response> {
        const { idAmountToReceive, idUser } = req.params;

        const deleteAmountToReceive = (await amountToReceiveRepository.findOne({
            where: { idAmountToReceive: Number(idAmountToReceive), user: { idUser: Number(idUser) } },
        })) as AmountToReceiveDTO;

        const amountToReceiveDeleted: AmountToReceiveDTO = await amountToReceiveRepository.remove(
            deleteAmountToReceive
        );

        return res.status(200).send(amountToReceiveDeleted);
    }
}

export default new AmountToReceiveController();
