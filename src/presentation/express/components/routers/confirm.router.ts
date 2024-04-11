import { Router } from "express";
import { confirmController } from "../controllers";
import { roleAccessMiddleware } from "../../../middlewares";

export const confirmRouter = Router();

confirmRouter.get('/activate/:link', confirmController.confirmEmail);
confirmRouter.get('/get/:target&:value', roleAccessMiddleware(["ADMIN"]), confirmController.get);