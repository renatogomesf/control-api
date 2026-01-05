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
    username: process.env.DB_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: false,
    logging: false,
    entities: [User, Goal, Revenue, Expense, AmountToReceive, AmountToPay],
    subscribers: [],
    migrations: ['src/db/migrations/*{.js,.ts}'],
    migrationsRun: false,
    migrationsTableName: 'migrations',
    migrationsTransactionMode: 'all',
});
