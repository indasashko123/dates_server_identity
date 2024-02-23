import { Router } from "express";
import { authController } from "../controllers";
import {body, query} from "express-validator";
import { authMiddleware } from "../middlewares";


export const authRouter = Router();

authRouter.post('/sign-up',
    body('email').isEmail(),
    body('password').isString().isLength({min : 6, max : 32}),
    authController.singUp);

authRouter.post('/sign-in',
    body('email').isEmail(),
    body('password').isString().isLength({min : 6, max : 32}),
    authController.singIn);

authRouter.post('/sing-out', authMiddleware, authController.signOut);

authRouter.post('/refresh', authController.refresh);


authRouter.post('/reset-password', authMiddleware, authController.resetPasswordRequest);


authRouter.post('/change-password',  
                authMiddleware,
                body('newPassword').isString().isLength({min : 6, max : 32}),
                body('oldPassword').isString().isLength({min : 6, max : 32}),
                authController.changePassword);

authRouter.post("/forgot-password", authController.forgotPassword);


authRouter.post('/confirm-reset-password',
                query('link').isString(),
                authController.confirmResurrectPassword);

authRouter.post("/ressurectpass",
                body("password").isString().isLength({min : 6, max : 32}),
                query("accountId").isString(),
                authController.resurrectPassword);