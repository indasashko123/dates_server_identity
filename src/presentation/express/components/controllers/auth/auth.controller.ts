import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";


import { authService,LoginDto,CreateAccountDto, ChangePassDto } from "../../../../../app";
import { ExtendRequest } from "../../../extensions";
import { ApiError } from "../../../exceptions"; 


export class AuthController {



    async registration(req : ExtendRequest, res : Response, next : NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {0
                return next(ApiError.BadRequest("Validation error",errors.array()));
                console.log(errors);
            }
            const data = req.body as CreateAccountDto;
            const responce = await authService.registration(data);
            res.cookie('refreshToken', responce.jwt.refreshToken, 
                {   
                    httpOnly : true
                });
            return res.json(responce).status(200);    
        } catch(e) {
            next(e);
        }
    }    
 
    async login(req : ExtendRequest, res : Response, next : NextFunction) {
        try {
            const errors = validationResult(req);
            if (errors.isEmpty()) {0
                return next(ApiError.BadRequest("Validation error",errors.array()));
            }
            const data = req.body as LoginDto;
            const responce = await authService.login(data);
            res.cookie('refreshToken', responce.jwt.refreshToken, 
                {   
                    httpOnly : true
                });
            return res.json(responce).status(200);    
        } catch(e) {
            next(e);
        }
    }

    async logout (req : ExtendRequest, res : Response, next : NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            await authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.status(200);
        } catch(e) {
            next(e);
        }
    }
   
    async refresh(req : ExtendRequest, res : Response, next : NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            res.clearCookie('refreshToken');
            const responce = await authService.refresh(refreshToken);
            res.cookie('refreshToken', responce.jwt.refreshToken, 
            {   
                httpOnly : true
            });
            return res.json(responce).status(200);    
        } catch(e) {
            next(e); 
        }
    }

    async resetPasswordRequest(req : ExtendRequest, res : Response, next : NextFunction) {
        try {
           const acc = req.account;
           await authService.resetPasswordRequest(acc.id);
        } catch(e) {
            next(e);
        }
    }

    async changePassword (req : ExtendRequest, res : Response, next : NextFunction) {
        try {
            const acc = req.account;
            const {oldPassword, newPassword} = req.body;
            await authService.changePass({accountId : acc.id, oldPassword,newPassword});
            const {refreshToken} = req.cookies;
            await authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            /// TODO : registration or login page redirect
            return res.redirect("REG|LOGIN PAGE");
         } catch(e) {
            next(e);
         }
    }

    async forgotPass (req : ExtendRequest, res : Response, next : NextFunction) {
        try {
            const acc = req.account;
            const {refreshToken} = req.cookies;
            await authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            await authService.forgotPass(acc.id);
            return res.status(200);
        } catch(e) {
            next(e);
        }
    }

    async confirResetPassword (req : ExtendRequest, res : Response, next : NextFunction) {
        try {
            const link = req.params.link;
            await authService.confirResetPassword(link);
            return res.redirect("RESSURRECT PASSWORD PAGE");
        } catch(e) {
            next(e);
        }
    }

    async resurrectPassword (req : ExtendRequest, res : Response, next : NextFunction) {
        try {
            const {password} = req.body;
            const accountId = req.params.accountId;
            await authService.resurrectPassword({password, accountId});
            return res.redirect("RESSURRECT PASSWORD PAGE");
        } catch(e) {
            next(e);
        }
    }
}