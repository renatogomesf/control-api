import { AppDataSource } from '../data-source';
import Goal from '../entity/Goal';

export const goalRepository = AppDataSource.getRepository(Goal);
