import { AppDataSource } from '../data-source';
import Revenue from '../entity/Revenue';

export const revenueRepository = AppDataSource.getRepository(Revenue);
