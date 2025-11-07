import { AppDataSource } from '../data-source';
import AmountToReceive from '../entity/AmountToReceive';

export const amountToReceiveRepository = AppDataSource.getRepository(AmountToReceive);
