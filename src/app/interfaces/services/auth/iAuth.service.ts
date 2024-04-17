import {LoginResponce, ChangePassDto, CreateAccountDto, LoginDto, ResurrectPasswordDto } from "../../../dto";

export interface IAuthService {
    registration (dto : CreateAccountDto, fingerprint : string) : Promise<LoginResponce>; 
    login(dto : LoginDto, fingerprint : string) : Promise<LoginResponce>;
    logout(refreshToken : string, fingerPrint : string) : Promise<void>; 
    updateAccess (refreshToken : string, fingerprint : string) : Promise<LoginResponce>;
    updateRefresh (refreshToken : string, fingerprint : string) : Promise<LoginResponce>;
    changePass (dto : ChangePassDto) : Promise<void>;
    resurrectPassword( dto : ResurrectPasswordDto ): Promise<void>;
}