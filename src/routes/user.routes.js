import { Router } from 'express';
import userController from '../controllers/user.controller.js';

const userRoute = Router();

userRoute.post('/signup', userController.register);

// accRoute.post('/signin');

export default userRoute;
