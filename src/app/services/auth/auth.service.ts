import * as bcrypt from "bcrypt";
import * as uuid from "uuid";

import { ChangePassDto, ConfirmEmailDto, CreateAccountDto, LoginDto } from "../../dto";
import { AccountTarget, ActivationTarget } from "../../enums";
import { mainConfig } from "../../../config";
import {    ITokenPayload,
            IJwtToken, 
            IAuthService, 
            IAccountService, 
            IActivationService, 
            IMailService, 
            ITokenService, 
            IAccountRoleRepository, 
            IPasswordService} from "../../interfaces";

import { ApiError } from "../../exceptions";
import { LoginResponce } from "../../dto/responces";
import { ResurrectPasswordDto } from "../../dto/account/resurrectPassword.dto";




export class AuthService implements IAuthService {


    constructor (
        private readonly accountService : IAccountService,
        private readonly activationService : IActivationService,
        private readonly mailService : IMailService,
        private readonly tokenService : ITokenService,
        private readonly accountRoleRepository : IAccountRoleRepository,
        private readonly passwordService  : IPasswordService 
    ) {

    }



    async registration (dto : CreateAccountDto) : Promise<LoginResponce> {
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
                dateOfBirth : dto.dateOfBirth,
                email : dto.email,
                gender : dto.gender,
                password : hasedPassword
            });
        
            const activationLink = await this.activationService.createLink({
                accountId : String(acc.id),
                link : uuid.v4() 
            });

            await this.accountRoleRepository.create({accountId : acc.id, roleId : 1});

            const sendMail = await this.mailService.sendActivationMail({
                email : acc.email,
                value : activationLink
            });

            if (!sendMail) {
                throw ApiError.BadRequest("Не удалось отправить письмо");
            }

            const token : IJwtToken = this.tokenService.generateTokens({
                email : acc.email,
                id : acc.id,
                roles : ["USER"],
                activate : false
            });

            return {
                email : acc.email,
                id : acc.id,
                jwt : token,
                roles : ["USER"],
                activate : false
            };
        } catch(e) {
            throw ApiError.InternalError(e);
        }
    }

    async login(dto : LoginDto) : Promise<LoginResponce> {
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
            const activate = await this.activationService.get({target : ActivationTarget.accountId, value : acc[0].id});
            const payload : ITokenPayload = {
                email : acc[0].email,
                id : acc[0].id,
                roles : roles,
                activate : activate[0].isEmailConfirmed
            }

            const token : IJwtToken = this.tokenService.generateTokens(payload);

            return {
                email : acc[0].email,
                id : acc[0].id,
                jwt : token,
                activate : activate[0].isEmailConfirmed,
                roles : roles
            };
        } catch(e) {
            console.log(e);
            throw ApiError.InternalError(e);
        }
    }

    async logout(refreshToken : string) : Promise<void> {
    }
 
    async refresh (refreshToken : string) : Promise<LoginResponce> {
        if (!refreshToken) {
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
        const activation = await this.activationService.get({target : "accountId", value : acc[0].id});
        const token : IJwtToken = this.tokenService.generateTokens({
            email : acc[0].email,
            id : acc[0].id,
            roles : roles,
            activate : activation[0].isEmailConfirmed,
        });
        return {
            email : acc[0].email,
            id : acc[0].id,
            jwt : token,
            roles : roles,
            activate :  activation[0].isEmailConfirmed,
        };
    }

    async changePass( dto : ChangePassDto): Promise<void> {
        const isActive = await this.passwordService.isRequestActive(dto);
        if (!isActive) {
            throw ApiError.Forbidden();
        }
        const acc = await this.accountService.get({target : AccountTarget.id, value : dto.accountId});
        if (!acc || acc.length !== 1 ) {
            throw ApiError.NotFound();
        }
        const isOldPass = await bcrypt.compare(acc[0].password, dto.oldPassword);

        if (!isOldPass) {
            throw ApiError.BadRequest("Wrong old Password");
        }
        await this.accountService.update({...acc[0], password : dto.newPassword});
        await this.passwordService.deleteResetRequest(acc[0].id);
    }

    async resetPasswordRequest (id : string) : Promise<void> {
        await this.passwordService.createResetRequest(id);
    }

    async forgotPass(email: string): Promise<void> {
        const acc = (await this.accountService.get({target : AccountTarget.email, value : email}))[0];
        await this.accountService.update({...acc, password : "xxxxxxxx"});
        const link = await this.passwordService.createResetLink(acc.id);
        await this.mailService.sendResetPasswordMail({email : acc.email, value : link.link});
    }

    async confirmResurrectPassword (link : string) : Promise<void> {
        const resetlink = await this.passwordService.getResetLink(link);
        if (!resetlink) {
            throw ApiError.NotFound();
        }
        const acc = (await this.accountService.get({target : AccountTarget.id, value : resetlink.accountId}))[0];
        if (!acc) {
            throw ApiError.NotFound();
        }
        if (acc.password !== "xxxxxxxx") {
            throw ApiError.BadRequest("");
        }
        await this.passwordService.confirmLink(resetlink);
    }
    
    async resurrectPassword(dto: ResurrectPasswordDto): Promise<void> {
        const acc = (await this.accountService.get({target  : AccountTarget.id , value : dto.accountId}))[0];
        if (!acc) {
            throw ApiError.NotFound();
        }
        const link = await this.passwordService.getResetLinkByAccount(acc.id);
        if (link.length !== 0 || !link[0].isConfirmed) {
            throw ApiError.BadRequest("Bad request to change password");
        }
        const hashPass = await this.hashPass(dto.password);
        await this.accountService.update({
            ...acc, password : hashPass
        })
    }

    private async hashPass(pass : string) : Promise<string> {
        return await bcrypt.hash(pass, mainConfig.auth.passwordSaltRound);
    }
}




