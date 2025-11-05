import { Request, Response } from 'express';
import { revenueRepository } from '../repositories/revenueRepository';
import Revenue from '../entity/Revenue';

class RevenueController {
    async getOneRevenue(req: Request, res: Response): Promise<Response> {
        const { idRevenue, idUser } = req.params;

        const oneRevenue = await revenueRepository.findOne({
            where: { idRevenue: Number(idRevenue), user: { idUser: Number(idUser) } },
            loadRelationIds: true,
        });

        return res.status(200).send(oneRevenue);
    }

    async getAllRevenue(req: Request, res: Response): Promise<Response> {
        const allRevenue = await revenueRepository.find({ loadRelationIds: true });

        return res.status(200).send(allRevenue);
    }

    async createRevenue(req: Request, res: Response): Promise<Response> {
        const { date, description, value, idUser } = req.body;

        const newRevenue = new Revenue();

        newRevenue.date = date;
        newRevenue.description = description;
        newRevenue.value = value;
        newRevenue.user = idUser;

        const revenueCreated = await revenueRepository.save(newRevenue);

        return res.status(201).send(revenueCreated);
    }

    async updateRevenue(req: Request, res: Response): Promise<Response> {
        const { idRevenue, idUser } = req.params;
        const { date, description, value } = req.body;

        const updateRevenue = await revenueRepository.findOne({
            where: { idRevenue: Number(idRevenue), user: { idUser: Number(idUser) } },
        });

        if(!updateRevenue){
            return res.status(404).send({message: "Revenue not found"})
        }

        updateRevenue.date = date;
        updateRevenue.description = description;
        updateRevenue.value = value;

        const revenueUpdated = await revenueRepository.save(updateRevenue);

        return res.status(200).send(revenueUpdated);
    }

    async deleteRevenue(req: Request, res: Response): Promise<Response> {
        const { idRevenue, idUser } = req.params;

        const deleteRevenue = await revenueRepository.findOne({
            where: { idRevenue: Number(idRevenue), user: { idUser: Number(idUser) } },
        });

        if(!deleteRevenue){
            return res.status(404).send({message: "Revenue not found"})
        }

        const revenueDeleted = await revenueRepository.remove(deleteRevenue);

        return res.status(200).send(revenueDeleted);
    }
}

export default new RevenueController();
