import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";

import { GetAccountQuerry,ApiError,accountService } from "../../../../../app";
import { ExtendRequest } from "../../../extensions";



export class AccountController {

    async get (req : ExtendRequest, res : Response, next : NextFunction) {
        try {
            const errors = validationResult(req);
            if (errors.isEmpty()) {0
                return next(ApiError.BadRequest("Validation error",errors.array()));
            }
            const query : GetAccountQuerry = req.query as GetAccountQuerry;
            const accs = await accountService.get(query);
            return res.json(accs).status(200);
        } catch(e) {
            next(e);
        }
    }
}