import {LoginResponce, ChangePassDto, CreateAccountDto, LoginDto,ResurrectPasswordDto } from "../../../dto";

export interface IAuthService {
    registration (dto : CreateAccountDto, fingerprint : string) : Promise<LoginResponce>; 
    login(dto : LoginDto, fingerprint : string) : Promise<LoginResponce>;
    logout(refreshToken : string) : Promise<void>; 
    refresh (refreshToken : string, fingerprint : string) : Promise<LoginResponce>;
    changePass (dto : ChangePassDto) : Promise<void>;
    resetPasswordRequest (id : string) : Promise<void>;
    forgotPass (id : string) : Promise<void>;
    confirmResurrectPassword (link : string) : Promise<void>;
    resurrectPassword(dto : ResurrectPasswordDto) : Promise<void>;
}