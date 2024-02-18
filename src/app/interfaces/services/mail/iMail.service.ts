import { SendActivationDto, SendResetPasswordDto } from "../../../dto";

export interface IMailService {
    sendActivationMail (data : SendActivationDto) : Promise<boolean>;
    sendResetPasswordMail (data : SendResetPasswordDto) : Promise<boolean>;
}