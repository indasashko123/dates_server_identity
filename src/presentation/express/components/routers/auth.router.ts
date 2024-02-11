import { Router } from "express";
import { authController } from "../controllers";
import {body} from "express-validator";
import { authMiddleware } from "../middlewares";


export const authRouter = Router();

authRouter.post('/reg',
    body('email').isEmail(),
    body('password').isString().isLength({min : 6, max : 32}),
    authController.registration);

authRouter.post('/login',
    body('email').isEmail(),
    body('password').isString().isLength({min : 6, max : 32}),
    authController.login);

authRouter.post('/logout', authMiddleware, authController.logout);

authRouter.post('/refresh', authController.refresh);