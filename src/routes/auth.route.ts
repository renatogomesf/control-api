import { Router } from 'express';

import authRoute from '../auth/AuthRoute';

const authAppRoute = Router();

authAppRoute.get('/auth', authRoute.auth);

export default authAppRoute;
