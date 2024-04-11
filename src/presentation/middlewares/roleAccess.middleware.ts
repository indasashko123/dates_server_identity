import { NextFunction, Response } from "express";
import { ApiError } from "../../../../app";
import { ExtendRequest } from "../../../extensions";

export const roleAccessMiddleware = (roles : string[]) => {
    return function (req : ExtendRequest,res : Response,next : NextFunction) {
        try {
            const acc = req.account;
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