import { Router } from "express";
import { profileController } from "../controllers";
import {query, body} from "express-validator";
import { authMiddleware, roleAccessMiddleware } from "../../../middlewares";

export const profileRouter = Router();

profileRouter.post('/',
    authMiddleware,
    body("about").isString().isLength({min : 20, max : 500}),
    body("city").isString().isLength({min : 3, max : 32}),
    body("name").isString().isLength({min : 5, max : 32}),
    body("search").isString(),
    roleAccessMiddleware(['USER']),
    profileController.create);
    
profileRouter.get('/', 
    authMiddleware,
    query('page').optional().isNumeric(),
    query('perPage').optional().isNumeric(),
    query('target').optional().isString(),
    query('value').optional().isString(),
    query('isDeleted').optional().isBoolean(),
    profileController.get);

profileRouter.put("/", 
    authMiddleware,
    body("about").isString().isLength({min : 20, max : 500}),
    body("city").isString().isLength({min : 3, max : 32}),
    body("name").isString().isLength({min : 5, max : 32}),
    body("genderSearch").isString(),
    body("id").isNumeric(),
    roleAccessMiddleware(['USER']),
    profileController.update);

profileRouter.delete("/",
    authMiddleware,
    body("id").isNumeric,
    roleAccessMiddleware(["USER"]),
    profileController.delete);