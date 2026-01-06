import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';

import User from './entity/User';
import Goal from './entity/Goal';
import Revenue from './entity/Revenue';
import Expense from './entity/Expense';
import AmountToReceive from './entity/AmountToReceive';
import AmountToPay from './entity/AmountToPay';

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.URL_DB,
    ssl: { rejectUnauthorized: false },
    synchronize: false,
    logging: false,
    entities: [User, Goal, Revenue, Expense, AmountToReceive, AmountToPay],
    subscribers: [],
    migrations: [__dirname + '/db/migrations/*{.js,.ts}'],
    migrationsRun: false,
    migrationsTableName: 'migrations',
    migrationsTransactionMode: 'all',
});
