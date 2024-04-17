import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../app";

export const ErrorMiddleware = (err : any, req : Request, res : Response, next : NextFunction) => {
    if (err instanceof ApiError) {
        return res.status(Number(err.status)).json({
            messgae : err.message,
            errors : err.errors
        });
    }
    return res.status(500).json({
        message : "Server Error"
    });
}