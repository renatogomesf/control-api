import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import { AppDataSource } from './data-source';
import 'dotenv/config';

try {
    AppDataSource.initialize();
} catch (error) {
    console.log(error);
}

import routerPrivate from './routes';
import loginRoute from './routes/login.route';
import registerRoute from './routes/register.route';
import authAppRoute from './routes/auth.route';

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(express.json());
app.use(loginRoute);
app.use(registerRoute);
app.use(authAppRoute);
app.use(routerPrivate);

app.listen(Number(process.env.SERVER_PORT), String(process.env.SERVER_HOST), () => {
    console.log('server up');
});

export default app;
