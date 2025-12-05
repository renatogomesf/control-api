import { Request, Response, NextFunction } from 'express';
import { revenueRepository } from '../../repositories/revenueRepository';
import { RevenueDTO } from '../../dtos/revenueDto/revenue.dto';

class GetAllRevenueMiddleware {
    async verifyGetAllRevenue(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { idUser } = req.params;

        const revenues: RevenueDTO[] | null = await revenueRepository.find({
            where: { user: { idUser: Number(idUser) } },
            loadRelationIds: true,
        });

        if (!revenues) {
            return res.status(404).send({ message: 'Revenue not found' });
        }

        next();
    }
}

export default new GetAllRevenueMiddleware();
