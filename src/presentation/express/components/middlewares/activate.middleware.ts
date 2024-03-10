import { NextFunction, Response } from "express";
import { ExtendRequest } from "../../extensions";
import { ActivationTarget, ApiError } from "../../../../app";
import { activationRepository } from "../../../../database";



export const activateMiddleware = async(req : ExtendRequest, res : Response, next : NextFunction) => {
    const acc = req.account;
    if (!acc.activate) {
        const activate = (await activationRepository.get({target : ActivationTarget.accountId, value : acc.id}))[0];
        if (!activate.isEmailConfirmed) {
            throw ApiError.Forbidden();
        } else {
            req.account.activate = true;
        }
    }
    next();
}