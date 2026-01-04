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
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Goal, Revenue, Expense, AmountToReceive, AmountToPay],
    subscribers: [],
    migrations: [],
});
