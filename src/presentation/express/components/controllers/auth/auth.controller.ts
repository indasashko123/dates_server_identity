import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";


import { authService,LoginDto,CreateAccountDto,ApiError  } from "../../../../../app";
import { ExtendRequest } from "../../../../extensions"; 
import { mainConfig } from "../../../../../config";

const refreshConfig = {
    httpOnly : true,
    maxAge : Number(mainConfig.auth.refreshExpiredTime)
}

/** 
 * Auth controller
*/
export class AuthController {
    
    /** 
    * Sign up
    */
    async singUp(req : ExtendRequest, res : Response, next : NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {0
                return next(ApiError.BadRequest("Validation error",errors.array()));
            }
            const { fingerprint } = req;
            const finderPrintData : string = String(fingerprint);
            const data = req.body as CreateAccountDto;
            const responce = await authService.registration(data,finderPrintData);
            res.cookie('refreshToken', responce.jwt.refreshToken, 
            refreshConfig);
            const jwt = responce.jwt;
            return res.json({...jwt, accessTokenExpired :  mainConfig.auth.accessExpiredTime}).status(200);    
        } catch(e) {
            next(e);
        }
    }    
 
    async singIn(req : ExtendRequest, res : Response, next : NextFunction) {
        try {
            const errors = validationResult(req);
            if (errors.isEmpty()) {0
                return next(ApiError.BadRequest("Validation error",errors.array()));
            }
            const { fingerprint } = req;
            const finderPrintData : string = String(fingerprint);
            const data = req.body as LoginDto;
            const responce = await authService.login(data,finderPrintData);
            res.cookie('refreshToken', responce.jwt.refreshToken, 
                refreshConfig);
            const jwt = responce.jwt;
            return res.json({...jwt, accessTokenExpired :  mainConfig.auth.accessExpiredTime}).status(200);    
        } catch(e) {
            next(e);
        }
    }


    async signOut (req : ExtendRequest, res : Response, next : NextFunction) {
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
            const { fingerprint } = req;
            const finderPrintData : string = String(fingerprint);
            const responce = await authService.refresh(refreshToken,finderPrintData);
            res.cookie('refreshToken', responce.jwt.refreshToken, 
            refreshConfig);
            const jwt = responce.jwt;
            return res.json({...jwt, accessTokenExpired :  mainConfig.auth.accessExpiredTime}).status(200);  
       } catch(e) {
            next(e); 
        }
    }

    async resetPasswordRequest(req : ExtendRequest, res : Response, next : NextFunction) {
        try {
           const acc = req.account;
           await authService.resetPasswordRequest(acc.id);
           return res.status(200).json({message : "ok"});
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

    async forgotPassword (req : ExtendRequest, res : Response, next : NextFunction) {
        try {
            const email = req.body.email;
            await authService.forgotPass(email);
            return res.status(200);
        } catch(e) {
            next(e);
        }
    }

    async confirmResurrectPassword (req : ExtendRequest, res : Response, next : NextFunction) {
        try {
            const link = req.params.link;
            await authService.confirmResurrectPassword(link);
            /// TODO : Log-out all accounts
            /// TODO : RESSURECT PAGE
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
            const {refreshToken} = req.cookies;
            await authService.logout(refreshToken);
            res.clearCookie('refreshToken');
             /// TODO : RESSURECT PAGE
            return res.redirect("RESSURRECT PASSWORD PAGE");
        } catch(e) {
            next(e);
        }
    }
}