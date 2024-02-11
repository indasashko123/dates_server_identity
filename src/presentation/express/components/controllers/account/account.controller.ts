import { NextFunction, Request, Response } from "express";
import { GetAccountQuerry } from "../../../../../app";
import { validationResult } from "express-validator";
import { ApiError } from "../../../exceptions";
import { ExtendRequest } from "../../../extensions";
import { accountService } from "../../../../../app";



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