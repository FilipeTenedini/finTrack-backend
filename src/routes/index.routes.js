import { Router } from 'express';
import userRoute from './user.routes.js';
import accountRoute from './account.routes.js';

const router = Router();

router.use('/user', userRoute);

router.use('/account', accountRoute);

export default router;
