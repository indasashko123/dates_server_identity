import { NextFunction, Request, Response } from "express";
import { ApiError,tokenService  } from "../../../../app"; 
import { ExtendRequest } from "../../../extensions";


export const authMiddleware = (req : ExtendRequest ,res : Response, next : NextFunction) => {
    try {
        const authToken = req.headers.authorization.split('')[1];
        if (!authToken) {
            return next(ApiError.Unathorized());
        }
        const userData = tokenService.validateAccess(authToken);
        if (!userData) {
            return next(ApiError.Unathorized());
        }
        req.account = userData;
        next();

    } catch(e) {
        return next(ApiError.Unathorized());
    }
}