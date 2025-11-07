import { AppDataSource } from '../data-source';
import AmountToPay from '../entity/AmountToPay';

export const amountToPayRepository = AppDataSource.getRepository(AmountToPay);
