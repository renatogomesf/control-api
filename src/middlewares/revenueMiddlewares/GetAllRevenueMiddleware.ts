import { Request, Response, NextFunction } from 'express';
import { revenueRepository } from '../../repositories/revenueRepository';
import { RevenueDTO } from '../../dtos/revenueDto/revenue.dto';

class GetAllRevenueMiddleware {
    async verifyGetAllRevenue(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { idUser } = req.params;

        try {
            const revenues: RevenueDTO[] | null = await revenueRepository.find({
                where: { user: { idUser: Number(idUser) } },
                loadRelationIds: true,
            });

            if (!revenues) {
                return res.status(404).send({ message: 'Revenue not found' });
            }
        } catch (error) {
            return res.status(500).send({ message: 'Internal Server Error', error });
        }

        next();
    }
}

export default new GetAllRevenueMiddleware();
