import { Router } from 'express';
import AmountToPayController from '../../../controllers/AmountToPayController';
import GetOneAmountToPayMiddleware from '../../../middlewares/amountToPayMiddlewares/GetOneAmountToPayMiddleware';
import GetAllAmountToPayMiddleware from '../../../middlewares/amountToPayMiddlewares/GetAllAmountToPayMiddleware';
import CreateAmountToPayMiddleware from '../../../middlewares/amountToPayMiddlewares/CreateAmountToPayMiddleware';
import UpdateAmountToPayMiddleware from '../../../middlewares/amountToPayMiddlewares/UpdateAmountToPayMiddleware';
import DeleteAmountToPayMiddleware from '../../../middlewares/amountToPayMiddlewares/DeleteAmountToPayMiddleware';

const amountToPayRoute = Router();

amountToPayRoute.get(
    '/amounttopay/:idAmountToPay/:idUser',
    GetOneAmountToPayMiddleware.verifyGetOneAmountToPay,
    AmountToPayController.getOneAmountToPay
);

amountToPayRoute.get(
    '/amounttopay',
    GetAllAmountToPayMiddleware.verifyGetAllAmountToPay,
    AmountToPayController.getAllAmountToPay
);

amountToPayRoute.post(
    '/amounttopay',
    CreateAmountToPayMiddleware.verifyCreateAmountToPay,
    AmountToPayController.createAmountToPay
);

amountToPayRoute.put(
    '/amounttopay/:idAmountToPay/:idUser',
    UpdateAmountToPayMiddleware.verifyUpdateAmountToPay,
    AmountToPayController.updateAmountToPay
);

amountToPayRoute.delete(
    '/amounttopay/:idAmountToPay/:idUser',
    DeleteAmountToPayMiddleware.verifyDeleteAmountToPay,
    AmountToPayController.deleteAmountToPay
);

export default amountToPayRoute;
