import { Router } from 'express';
import AmountToReceiveController from '../../../controllers/AmountToReceiveController';
import GetOneAmountToReceiveMiddleware from '../../../middlewares/amountToReceiveMiddlewares/GetOneAmountToReceiveMiddleware';
import GetAllAmountToReceiveMiddleware from '../../../middlewares/amountToReceiveMiddlewares/GetAllAmountToReceiveMiddleware';
import CreateAmountToReceiveMiddleware from '../../../middlewares/amountToReceiveMiddlewares/CreateAmountToReceiveMiddleware';
import UpdateAmountToReceiveMiddleware from '../../../middlewares/amountToReceiveMiddlewares/UpdateAmountToReceiveMiddleware';
import DeleteAmountToReceiveMiddleware from '../../../middlewares/amountToReceiveMiddlewares/DeleteAmountToReceiveMiddleware';

const amountToReceiveRoute = Router();

amountToReceiveRoute.get('/amounttoreceive/:idAmountToReceive/:idUser',GetOneAmountToReceiveMiddleware.verifyGetOneAmountToReceive, AmountToReceiveController.getOneAmountToReceive);

amountToReceiveRoute.get('/amounttoreceive',GetAllAmountToReceiveMiddleware.verifyGetAllAmountToReceive, AmountToReceiveController.getAllAmountToReceive);

amountToReceiveRoute.post('/amounttoreceive', CreateAmountToReceiveMiddleware.verifyCreateAmountToReceive, AmountToReceiveController.createAmountToReceive);

amountToReceiveRoute.put('/amounttoreceive/:idAmountToReceive/:idUser',UpdateAmountToReceiveMiddleware.verifyUpdateAmountToReceive, AmountToReceiveController.updateAmountToReceive);

amountToReceiveRoute.delete('/amounttoreceive/:idAmountToReceive/:idUser',DeleteAmountToReceiveMiddleware.verifyDeleteAmountToReceive, AmountToReceiveController.deleteAmountToReceive);

export default amountToReceiveRoute;
