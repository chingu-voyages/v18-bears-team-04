import express from 'express';
import controllers from '../controllers';

const { authController } = controllers;

const userRoute = express.Router();

//Register route
userRoute.post('/register', authController.registerUserController);

//Login route
userRoute.post('/login', authController.loginUserController);

export default userRoute;
