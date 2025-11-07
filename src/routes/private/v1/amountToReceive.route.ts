import { Router } from 'express';
import AmountToReceiveController from '../../../controllers/AmountToReceiveController';

const amountToReceiveRoute = Router();

amountToReceiveRoute.get('/amounttoreceive/:idAmountToReceive/:idUser', AmountToReceiveController.getOneAmountToReceive);

amountToReceiveRoute.get('/amounttoreceive', AmountToReceiveController.getAllAmountToReceive);

amountToReceiveRoute.post('/amounttoreceive', AmountToReceiveController.createAmountToReceive);

amountToReceiveRoute.put('/amounttoreceive/:idAmountToReceive/:idUser', AmountToReceiveController.updateAmountToReceive);

amountToReceiveRoute.delete('/amounttoreceive/:idAmountToReceive/:idUser', AmountToReceiveController.deleteAmountToReceive);

export default amountToReceiveRoute;
