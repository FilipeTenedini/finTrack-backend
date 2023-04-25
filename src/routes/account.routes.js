import { Router } from 'express';
import accountController from '../controllers/account.controller.js';

const accountRoute = Router();

accountRoute.post('/new_transaction/:type', accountController.newTransaction);

export default accountRoute;
