import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import validSchemas from '../middlewares/validSchemas.middleware.js';
import userSchema from '../schemas/user.schema.js';
import loginSchema from '../schemas/login.schema.js';

const userRoute = Router();

userRoute.post('/signup', validSchemas(userSchema), userController.register);

userRoute.post('/signin', validSchemas(loginSchema), userController.signin);

export default userRoute;
