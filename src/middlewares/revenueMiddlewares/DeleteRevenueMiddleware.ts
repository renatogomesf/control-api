import { Request, Response, NextFunction } from 'express';
import { revenueRepository } from '../../repositories/revenueRepository';
import { RevenueDTO } from '../../dtos/revenueDto/revenue.dto';

class DeleteRevenueMiddleware {
    async verifyDeleteRevenue(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { idRevenue, idUser } = req.params;

        const deleteRevenue: RevenueDTO | null = await revenueRepository.findOne({
            where: { idRevenue: Number(idRevenue), user: { idUser: Number(idUser) } },
        });

        if (!deleteRevenue) {
            return res.status(404).send({ message: 'Revenue not found' });
        }

        next();
    }
}

export default new DeleteRevenueMiddleware();
