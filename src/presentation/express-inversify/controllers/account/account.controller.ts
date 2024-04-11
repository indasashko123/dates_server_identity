import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import { inject, injectable } from "inversify";
import { ExtendRequest } from "../../../extensions";
import { ApiError, GetAccountQuerry, IAccountService } from "../../../../app";


@injectable()
export class AccountController {


    constructor(
        @inject("IAccountService") private readonly accountService : IAccountService
    ) {}

    async get (req : ExtendRequest, res : Response, next : NextFunction) {
        try {
            const errors = validationResult(req);
            if (errors.isEmpty()) {0
                return next(ApiError.BadRequest("Validation error",errors.array()));
            }
            const query : GetAccountQuerry = req.query as GetAccountQuerry;
            const accs = await this.accountService.get(query);
            return res.json(accs).status(200);
        } catch(e) {
            next(e);
        }
    }
}