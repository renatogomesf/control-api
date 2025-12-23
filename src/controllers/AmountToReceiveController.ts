import { Request, Response } from 'express';
import { amountToReceiveRepository } from '../repositories/amountToReceiveRepository';
import AmountToReceive from '../entity/AmountToReceive';
import { AmountToReceiveDTO } from '../dtos/amountToReceiveDto/amountToReceive.dto';
import { CreateAmountToReceiveDTO } from '../dtos/amountToReceiveDto/createAmountToReceive.dto';
import { UpdateAmountToReceiveDTO } from '../dtos/amountToReceiveDto/updateAmountToReceive.dto';

class AmountToReceiveController {
    async getAllAmountToReceive(req: Request, res: Response): Promise<Response> {
        const { idUser } = req.params;

        const amountsToReceive = (await amountToReceiveRepository.find({
            where: { user: { idUser: Number(idUser) } },
            loadRelationIds: true,
        })) as AmountToReceiveDTO[];

        return res.status(200).send(amountsToReceive);
    }

    async createAmountToReceive(req: Request, res: Response): Promise<Response> {
        const { date, name, description, value, idUser }: CreateAmountToReceiveDTO = req.body;

        try {
            const newAmountToReceive = new AmountToReceive();

            newAmountToReceive.date = date;
            newAmountToReceive.name = name;
            newAmountToReceive.description = description;
            newAmountToReceive.value = value;
            newAmountToReceive.user = idUser;

            const amountToReceiveCreated: AmountToReceiveDTO = await amountToReceiveRepository.save(newAmountToReceive);

            return res.status(201).send(amountToReceiveCreated);
        } catch (error) {
            return res.status(500).send({ message: 'Internal Server Error', error });
        }
    }

    async updateAmountToReceive(req: Request, res: Response): Promise<Response> {
        const { idAmountToReceive, idUser } = req.params;
        const { date, name, description, value }: UpdateAmountToReceiveDTO = req.body;

        try {
            const updateAmountToReceive = (await amountToReceiveRepository.findOne({
                where: { idAmountToReceive: Number(idAmountToReceive), user: { idUser: Number(idUser) } },
            })) as AmountToReceiveDTO;

            updateAmountToReceive.date = date;
            updateAmountToReceive.name = name;
            updateAmountToReceive.description = description;
            updateAmountToReceive.value = value;

            const amountToReceiveUpdated: AmountToReceiveDTO = await amountToReceiveRepository.save(
                updateAmountToReceive
            );

            return res.status(200).send(amountToReceiveUpdated);
        } catch (error) {
            return res.status(500).send({ message: 'Internal Server Error', error });
        }
    }

    async deleteAmountToReceive(req: Request, res: Response): Promise<Response> {
        const { idAmountToReceive, idUser } = req.params;

        try {
            const deleteAmountToReceive = (await amountToReceiveRepository.findOne({
                where: { idAmountToReceive: Number(idAmountToReceive), user: { idUser: Number(idUser) } },
            })) as AmountToReceiveDTO;

            const amountToReceiveDeleted: AmountToReceiveDTO = await amountToReceiveRepository.remove(
                deleteAmountToReceive
            );

            return res.status(200).send(amountToReceiveDeleted);
        } catch (error) {
            return res.status(500).send({ message: 'Internal Server Error', error });
        }
    }
}

export default new AmountToReceiveController();
