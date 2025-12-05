import { Router } from 'express';
import RevenueController from '../../../controllers/RevenueController';
import GetAllRevenueMiddleware from '../../../middlewares/revenueMiddlewares/GetAllRevenueMiddleware';
import CreateRevenueMiddleware from '../../../middlewares/revenueMiddlewares/CreateRevenueMiddleware';
import UpdateRevenueMiddleware from '../../../middlewares/revenueMiddlewares/UpdateRevenueMiddleware';
import DeleteRevenueMiddleware from '../../../middlewares/revenueMiddlewares/DeleteRevenueMiddleware';

const revenueRoute = Router();

revenueRoute.get('/revenue/:idUser', GetAllRevenueMiddleware.verifyGetAllRevenue, RevenueController.getAllRevenue);

revenueRoute.post('/revenue', CreateRevenueMiddleware.verifyCreateRevenue, RevenueController.createRevenue);

revenueRoute.put(
    '/revenue/:idRevenue/:idUser',
    UpdateRevenueMiddleware.verifyUpdateRevenue,
    RevenueController.updateRevenue
);

revenueRoute.delete(
    '/revenue/:idRevenue/:idUser',
    DeleteRevenueMiddleware.verifyDeleteRevenue,
    RevenueController.deleteRevenue
);

export default revenueRoute;
