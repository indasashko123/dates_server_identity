import { NextFunction, Response } from "express";
import { ExtendRequest } from "../extensions";
import { ApiError } from "../../app";
import { activationRepository } from "../../database";



export const activateMiddleware = async(req : ExtendRequest, res : Response, next : NextFunction) => {
    try {
        const acc = req.account;
        if (!acc.isActivated) {
            throw ApiError.Forbidden();
        }
        next();    
    } catch(e) {
        next(e);
    }
}