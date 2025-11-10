import { Request, Response, NextFunction } from 'express';
import { revenueRepository } from '../../repositories/revenueRepository';
import { RevenueDTO } from '../../dtos/revenueDto/revenue.dto';

class GetAllRevenueMiddleware {
    async verifyGetAllRevenue(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const allRevenue: RevenueDTO[] = await revenueRepository.find({ loadRelationIds: true });

        if (allRevenue.length == 0) {
            return res.status(404).send({ message: 'Revenue not found' });
        }

        next();
    }
}

export default new GetAllRevenueMiddleware();
