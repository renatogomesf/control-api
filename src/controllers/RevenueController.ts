import { Request, Response } from 'express';
import { revenueRepository } from '../repositories/revenueRepository';
import Revenue from '../entity/Revenue';
import { RevenueDTO } from '../dtos/revenueDto/revenue.dto';
import { CreateRevenueDTO } from '../dtos/revenueDto/createRevenue.dto';
import { UpdateRevenueDTO } from '../dtos/revenueDto/updateRevenue.dto';

class RevenueController {
    async getAllRevenue(req: Request, res: Response): Promise<Response> {
        const { idUser } = req.params;

        const revenues = (await revenueRepository.find({
            where: { user: { idUser: Number(idUser) } },
            loadRelationIds: true,
        })) as RevenueDTO[];

        return res.status(200).send(revenues);
    }

    async createRevenue(req: Request, res: Response): Promise<Response> {
        const { date, description, value, idUser }: CreateRevenueDTO = req.body;

        try {
            const newRevenue = new Revenue();

            newRevenue.date = date;
            newRevenue.description = description;
            newRevenue.value = value;
            newRevenue.user = idUser;

            const revenueCreated: RevenueDTO = await revenueRepository.save(newRevenue);

            return res.status(201).send(revenueCreated);
        } catch (error) {
            return res.status(500).send({ message: 'Internal Server Error', error });
        }
    }

    async updateRevenue(req: Request, res: Response): Promise<Response> {
        const { idRevenue, idUser } = req.params;
        const { date, description, value }: UpdateRevenueDTO = req.body;

        try {
            const updateRevenue = (await revenueRepository.findOne({
                where: { idRevenue: Number(idRevenue), user: { idUser: Number(idUser) } },
            })) as RevenueDTO;

            updateRevenue.date = date;
            updateRevenue.description = description;
            updateRevenue.value = value;

            const revenueUpdated: RevenueDTO = await revenueRepository.save(updateRevenue);

            return res.status(200).send(revenueUpdated);
        } catch (error) {
            return res.status(500).send({ message: 'Internal Server Error', error });
        }
    }

    async deleteRevenue(req: Request, res: Response): Promise<Response> {
        const { idRevenue, idUser } = req.params;

        try {
            const deleteRevenue = (await revenueRepository.findOne({
                where: { idRevenue: Number(idRevenue), user: { idUser: Number(idUser) } },
            })) as RevenueDTO;

            const revenueDeleted: RevenueDTO = await revenueRepository.remove(deleteRevenue);

            return res.status(200).send(revenueDeleted);
        } catch (error) {
            return res.status(500).send({ message: 'Internal Server Error', error });
        }
    }
}

export default new RevenueController();
