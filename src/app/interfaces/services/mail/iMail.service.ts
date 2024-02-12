import { SendActivationDto } from "../../../dto";

export interface IMailService {
    sendActivationMail (data : SendActivationDto) : Promise<boolean>;
}