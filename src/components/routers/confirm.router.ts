import { Router } from "express";
import { confirmController } from "../controllers";
import { authMiddleware } from "../middlewares";

export const confirmRouter = Router();

confirmRouter.post('/activate/:link',authMiddleware, confirmController.confirmEmail);