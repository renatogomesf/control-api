import { Request, Response, NextFunction } from 'express';
import { revenueRepository } from '../../repositories/revenueRepository';
import { RevenueDTO } from '../../dtos/revenueDto/revenue.dto';
import { UpdateRevenueDTO } from './../../dtos/revenueDto/updateRevenue.dto';

class UpdateRevenueMiddleware {
    async verifyUpdateRevenue(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { idRevenue, idUser } = req.params;
        const { date, description, value }: UpdateRevenueDTO = req.body;

        try {
            const updateRevenue: RevenueDTO | null = await revenueRepository.findOne({
                where: { idRevenue: Number(idRevenue), user: { idUser: Number(idUser) } },
            });

            if (!updateRevenue) {
                return res.status(404).send({ message: 'Revenue not found' });
            }

            if (!date || !description || !value) {
                return res.status(400).send({ message: 'All fields are required' });
            }
        } catch (error) {
            return res.status(500).send({ message: 'Internal Server Error', error });
        }

        next();
    }
}

export default new UpdateRevenueMiddleware();
