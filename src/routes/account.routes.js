import { Router } from 'express';
import accountController from '../controllers/account.controller.js';
import validToken from '../middlewares/validToken.middleware.js';
import validSchemas from '../middlewares/validSchemas.middleware.js';
import accountMovement from '../schemas/accountMovement.schema.js';

const accountRoute = Router();

accountRoute.post('/new_transaction/:type', validToken, accountController.newTransaction);

accountRoute.get('/movements', validToken, accountController.listMovements);

accountRoute.delete('/delete_transaction', validToken, validSchemas(accountMovement), accountController.deleteTransaction);

export default accountRoute;
