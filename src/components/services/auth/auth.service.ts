import { AccountModel, accountRepository, accountRoleRepository, roleRepository } from "../../../database";
import { ConfirmEmailDto, CreateAccountDto, LoginDto } from "../../dto";
import { AccountTarget } from "../../../common";
import * as bcrypt from "bcrypt";
import { mainConfig } from "../../../config";
import { activationService, mailService, tokenService } from "..";
import * as uuid from "uuid";
import { IJwtToken } from "../../../interfaces";import { LoginResponce } from "../../responces";
import { ITokenPayload } from "../../../interfaces/jwt/iTokenPayload";
import { ApiError } from "../../../common";




export class AuthService {

    async registration (dto : CreateAccountDto) : Promise<LoginResponce> {
        try {
            const candidate = await accountRepository.get({
                target : AccountTarget.id,
                value : dto.email
            })

        
            if (candidate.length !== 0) {
                throw ApiError.BadRequest("Пользователь с такой почтой уже существует");
            }

            const hasedPassword =await this.hashPass(dto.password);
        
            const acc = await accountRepository.create({
                id : uuid.v4(),
                dateOfBirth : dto.dateOfBirth,
                email : dto.email,
                gender : dto.gender,
                password : hasedPassword
            });
        
            const activationLink = await activationService.createLink({
                accountId : String(acc.id),
                value : uuid.v4() 
            });
            await accountRoleRepository.create({accountId : acc.id, roleId : "1"});

            const sendMAil = await mailService.sendActivationMail({
                email : acc.email,
                value : activationLink
            });

            if (!sendMAil) {
                throw ApiError.BadRequest("Не удалось отправить письмо");
            }


            const token : IJwtToken = tokenService.generateTokens({
                email : acc.email,
                id : acc.id,
                roles : ["USER"]
            });

            return {
                email : acc.email,
                id : acc.id,
                jwt : token
            };
        } catch(e) {
            throw ApiError.InternalError(e);
        }
    }

    async login(dto : LoginDto) : Promise<LoginResponce> {
        try {

            const acc = await accountRepository.get({
                target : AccountTarget.email,
                value : dto.email
            });
            
            if (acc.length !== 1) {
                throw ApiError.BadRequest("Account not found");
            }
            const hasedPassword = await this.hashPass(dto.password)
            
            if (acc[0].password !== hasedPassword) {
                throw ApiError.BadRequest("Wrong password");
            }
            const roles = await accountRepository.getRolesNames(acc[0].id);

            const payload : ITokenPayload = {
                email : acc[0].email,
                id : acc[0].id,
                roles : roles
            }

            const token : IJwtToken = tokenService.generateTokens(payload);

            return {
                email : acc[0].email,
                id : acc[0].id,
                jwt : token
            };
        } catch(e) {
            throw ApiError.InternalError(e);
        }
    }

    async logout(refreshToken : string) : Promise<void> {
    }
 
    async refresh (refreshToken : string) : Promise<LoginResponce> {
        if (!refreshToken) {
            throw ApiError.Unathorized();
        }
        const payload = tokenService.validateRefersh(refreshToken);
        if (!payload) {
            throw ApiError.Unathorized();
        }        
        const acc = await accountRepository.get({value : payload.id, target : AccountTarget.id});
        if (acc.length !== 1) {
            throw ApiError.BadRequest("Account not found");
        }
        const roles = await accountRepository.getRolesNames(acc[0].id);
        const token : IJwtToken = tokenService.generateTokens({
            email : acc[0].email,
            id : acc[0].id,
            roles : roles
        });
        return {
            email : acc[0].email,
            id : acc[0].id,
            jwt : token
        };
    }


    private async hashPass(pass : string) : Promise<string> {
        return await bcrypt.hash(pass, mainConfig.auth.passwordSaltRound);
    }
}




