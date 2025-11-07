import { Router } from 'express';
import AmountToPayController from '../../../controllers/AmountToPayController';

const amountToPayRoute = Router();

amountToPayRoute.get('/amounttopay/:idAmountToPay/:idUser', AmountToPayController.getOneAmountToPay);

amountToPayRoute.get('/amounttopay', AmountToPayController.getAllAmountToPay);

amountToPayRoute.post('/amounttopay', AmountToPayController.createAmountToPay);

amountToPayRoute.put('/amounttopay/:idAmountToPay/:idUser', AmountToPayController.updateAmountToPay);

amountToPayRoute.delete('/amounttopay/:idAmountToPay/:idUser', AmountToPayController.deleteAmountToPay);

export default amountToPayRoute;
