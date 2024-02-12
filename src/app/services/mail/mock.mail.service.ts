import { mainConfig } from "../../../config";
import { SendActivationDto } from "../../dto";
import { IMailService } from "../../interfaces";

export class MockMailService implements IMailService{
 

    async sendActivationMail (data : SendActivationDto) : Promise<boolean> {
       try {
          console.log(`mail is - \n
                       ${mainConfig.server.host}/confirm/activate/${data.value}`);
          return true;
       } catch (e) {
          return false;
       }
    }


}