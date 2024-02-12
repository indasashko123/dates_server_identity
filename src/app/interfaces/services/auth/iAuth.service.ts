import { LoginResponce } from "../../../../presentation/express/components/responces";
import { CreateAccountDto, LoginDto } from "../../../dto";

export interface IAuthService {
    
    registration (dto : CreateAccountDto) : Promise<LoginResponce>; 
    login(dto : LoginDto) : Promise<LoginResponce>;
    logout(refreshToken : string) : Promise<void>; 
    refresh (refreshToken : string) : Promise<LoginResponce>;
}