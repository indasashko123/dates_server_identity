import { NextFunction, Response } from "express";
import { ExtendRequest } from "../../extensions";
import { ApiError } from "../../../../app/exceptions";



export const activateMiddleware = async(req : ExtendRequest, res : Response, next : NextFunction) => {
    const acc = req.account;
    if (!acc.activate) {
        throw ApiError.Forbidden();
    }
    next();
}