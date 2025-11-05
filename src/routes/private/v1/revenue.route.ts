import { Router } from 'express';
import RevenueController from '../../../controllers/RevenueController';

const revenueRoute = Router();

revenueRoute.get('/revenue/:idRevenue/:idUser', RevenueController.getOneRevenue);

revenueRoute.get('/revenue', RevenueController.getAllRevenue);

revenueRoute.post('/revenue', RevenueController.createRevenue);

revenueRoute.put('/revenue/:idRevenue/:idUser', RevenueController.updateRevenue);

revenueRoute.delete('/revenue/:idRevenue/:idUser', RevenueController.deleteRevenue);

export default revenueRoute;
