import { LoginResponce } from "../../../dto/responces";
import { ChangePassDto, ConfirmEmailDto, CreateAccountDto, LoginDto } from "../../../dto";
import { ResurrectPasswordDto } from "../../../dto/account/resurrectPassword.dto";

export interface IAuthService {
    
    registration (dto : CreateAccountDto) : Promise<LoginResponce>; 
    login(dto : LoginDto) : Promise<LoginResponce>;
    logout(refreshToken : string) : Promise<void>; 
    refresh (refreshToken : string) : Promise<LoginResponce>;
    changePass (dto : ChangePassDto) : Promise<void>;
    resetPasswordRequest (id : string) : Promise<void>;
    forgotPass (id : string) : Promise<void>;
    confirmResurrectPassword (link : string) : Promise<void>;
    resurrectPassword(dto : ResurrectPasswordDto) : Promise<void>;
}