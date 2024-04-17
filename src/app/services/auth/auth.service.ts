import * as bcrypt from "bcrypt";
import * as uuid from "uuid";

import { 
    ChangePassDto, CreateAccountDto, 
    LoginDto, LoginResponce,  
    ResurrectPasswordDto} from "../../dto";
import { AccountTarget } from "../../enums";
import { mainConfig } from "../../../config";
import {   
    ITokenPayload, IJwtToken, 
    IAuthService, IAccountService, 
    ITokenService, ISessionService } from "../../interfaces";
import { ApiError } from "../../exceptions";
import { Account } from "../../../domain";



export class AuthService implements IAuthService {


    constructor (
        private readonly accountService : IAccountService,
        private readonly tokenService : ITokenService,
        private readonly sessionService : ISessionService, 
    ) {

    }



    async registration (dto : CreateAccountDto,  fingerprint : string) : Promise<LoginResponce> {
        try {
            const candidate = await this.accountService.get({
                target : AccountTarget.id,
                value : dto.email
            });

            if (candidate.length !== 0) {
                throw ApiError.BadRequest("Пользователь с такой почтой уже существует");
            }

            const hasedPassword =await this.hashPass(dto.password);
        
            const acc = await this.accountService.create({
                id : uuid.v4(),
                email : dto.email,
                password : hasedPassword
            });
        
            /**TODO: Присвоить роль пользователю */

            const token : IJwtToken = this.tokenService.generateTokens({
                email : acc.email,
                id : acc.id,
                roles : ["USER"],
                isActivated : false
            });

            await this.sessionService.create({fingerprint, refreshToken: token.refreshToken});

            return {
                email : acc.email,
                id : acc.id,
                jwt : token,
                roles : ["USER"],
                isActivated : false
            };
        } catch(e) {
            throw ApiError.InternalError(e);
        }
    }
    async login(dto : LoginDto, fingerprint : string) : Promise<LoginResponce> {
        try {
            const acc = await this.accountService.get({
                target : AccountTarget.email,
                value : dto.email
            });
            
            if (acc.length !== 1) {
                throw ApiError.BadRequest("Account not found");
            }
            
            const passwordConsens = await bcrypt.compare(dto.password, acc[0].password);

            if (!passwordConsens) {
                throw ApiError.BadRequest("Wrong password");
            }
            const roles = await this.accountService.getRolesNames(acc[0].id);

            const payload : ITokenPayload = {
                email : acc[0].email,
                id : acc[0].id,
                roles : roles,
                isActivated : acc[0].isActivated
            }
            await this.sessionService.deleteByfingerprint(fingerprint);
            const token : IJwtToken = this.tokenService.generateTokens(payload)
            await this.sessionService.create({fingerprint, refreshToken: token.refreshToken});
            
            return {
                email : acc[0].email,
                id : acc[0].id,
                jwt : token,
                isActivated : acc[0].isActivated,
                roles : roles
            };

        } catch(e) {
            throw ApiError.InternalError(e);
        }
    }
    async logout(refreshToken : string) : Promise<void> {
        await this.sessionService.deleteByRefresh(refreshToken);
    }
    async updateAccess (refreshToken : string,fingerprint : string) : Promise<LoginResponce> {
        return await this.updateToken(refreshToken,fingerprint);
    }
    async updateRefresh(refreshToken: string, fingerprint: string): Promise<LoginResponce> {
        return await this.updateToken(refreshToken,fingerprint);
    }
    async changePass( dto : ChangePassDto): Promise<void> {
        const acc = await this.accountService.get({target : AccountTarget.id, value : dto.accountId});
        if (!acc || acc.length !== 1 ) {
            throw ApiError.NotFound();
        }
        if (acc[0].email !== dto.email) {
            throw ApiError.BadRequest("Wrong email");
        }
        if (!acc[0].isActivated) {
            throw ApiError.BadRequest("email not confirm");     
        }
        const isOldPass = await bcrypt.compare( dto.oldPassword, acc[0].password);
        if (!isOldPass) {
            throw ApiError.BadRequest("Wrong old Password");
        }
        const newPassword = await this.hashPass(dto.newPassword);
        const accountToUpdate : Account= {
            id : acc[0].id,
            email : acc[0].email,
            isDeleted : acc[0].isDeleted,
            password : newPassword,
            isActivated : acc[0].isActivated,
        }
        await this.accountService.update(accountToUpdate);
    }
    async resurrectPassword( dto : ResurrectPasswordDto ): Promise<void> {
        const acc = await this.accountService.get({target : AccountTarget.id, value : dto.accountId});
        if (!acc || acc.length !== 1 ) {
            throw ApiError.NotFound();
        }
        if (acc[0].email !== dto.email) {
            throw ApiError.BadRequest("Wrong email");
        }
        if (!acc[0].isActivated) {
            throw ApiError.BadRequest("email not confirm");     
        }
        const newPassword = await this.hashPass(dto.newPassword);
        const accountToUpdate : Account= {
            id : acc[0].id,
            email : acc[0].email,
            isDeleted : acc[0].isDeleted,
            password : newPassword,
            isActivated : acc[0].isActivated,
        }
        await this.accountService.update(accountToUpdate);
    }
    private async hashPass(pass : string) : Promise<string> {
        return await bcrypt.hash(pass, mainConfig.auth.passwordSaltRound);
    }
    private async updateToken(refreshToken : string,fingerprint : string) : Promise<LoginResponce> {
        if (!refreshToken) {
            throw ApiError.Unathorized();
        }
        const session = await this.sessionService.get({target : "refreshToken", value : refreshToken});
        if (!session && session[0].fingerprint != fingerprint) {
            throw ApiError.Unathorized();    
        }
        const payload = this.tokenService.validateRefersh(refreshToken);
        if (!payload) {
            throw ApiError.Unathorized();
        }        
        const acc = await this.accountService.get({value : payload.id, target : AccountTarget.id});
        if (acc.length !== 1) {
            throw ApiError.BadRequest("Account not found");
        }
        const roles = await this.accountService.getRolesNames(acc[0].id);
        await this.sessionService.deleteByRefresh(refreshToken);
        const token : IJwtToken = this.tokenService.generateTokens({
            email : acc[0].email,
            id : acc[0].id,
            roles : roles,
            isActivated : acc[0].isActivated,
        });
        await this.sessionService.create({fingerprint, refreshToken : token.refreshToken});
        
        return {
            email : acc[0].email,
            id : acc[0].id,
            jwt : token,
            roles : roles,
            isActivated :  acc[0].isActivated,
        };
    }
}