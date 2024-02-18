import { Router } from "express";
import { accountController } from "../controllers";
import {query} from "express-validator";
import { authMiddleware, roleAccessMiddleware } from "../middlewares";


export const accountRouter = Router();


accountRouter.get('/get',
    query('page').optional().isNumeric(),
    query('perPage').optional().isNumeric(),
    query('target').optional().isString(),
    query('value').optional().isString(),
    query('isDeleted').optional().isBoolean(),
    authMiddleware,
    roleAccessMiddleware(['ADMIN']),
    accountController.get);
    