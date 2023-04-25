import { Router } from 'express';
import accountController from '../controllers/account.controller.js';
import validToken from '../middlewares/validToken.middleware.js';

const accountRoute = Router();

accountRoute.post('/new_transaction/:type', validToken, accountController.newTransaction);

accountRoute.get('/movements', validToken, accountController.listMovements);

export default accountRoute;
