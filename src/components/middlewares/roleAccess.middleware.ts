import { NextFunction, Response } from "express";
import { ApiError, ExtendRequest } from "../../common";


export const roleAccessMiddleware = (roles : string[]) => {
    return function (req : ExtendRequest,res : Response,next : NextFunction) {
        if (req.method === "OPTION") {
            next();
        }
        try {
            const acc = req.account;
            if (!acc) {
                return next(ApiError.Unathorized());
            }
            let access : boolean = false;
            acc.roles.forEach(role => {
                if (roles.includes(role)) {
                    access = true;
                }
            })
            if (!access) {
                throw ApiError.Forbidden();
            }
            next();
        } catch(e) {
            throw ApiError.InternalError(e);
        }
    }
}