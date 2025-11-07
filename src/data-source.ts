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
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, Goal, Revenue, Expense, AmountToReceive, AmountToPay],
    subscribers: [],
    migrations: [],
});
