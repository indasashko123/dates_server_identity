import {Transporter, createTransport} from "nodemailer";

import { mainConfig } from "../../../config";
import { SendActivationDto, SendResetPasswordDto } from "../../dto";

import SMTPTransport from "nodemailer/lib/smtp-transport";
import { IMailService } from "../../interfaces";



export class MailService implements IMailService{
 
    private readonly transporter : Transporter<SMTPTransport.SentMessageInfo> ;
    constructor () {
     this.transporter = createTransport({
          service : "Gmail",
          auth: {
               user: mainConfig.mail.mailAccount,
               pass: mainConfig.mail.mailPass
          }});
    }

    async sendActivationMail (data : SendActivationDto) : Promise<boolean> {
       try {
          await this.transporter.sendMail({
               from : mainConfig.mail.mailAccount,
               to : data.email,
               text : "",
               html : `
                    <div>
                        <h1>Ссылка для активации письма</h1>
                        <a href=${mainConfig.server.host}/api/auth/confirm/link:${data.value}> link </a>
                    </div>
               `
          })
          return true;
       } catch (e) {
          return false;
       }
    }
    async sendResetPasswordMail (data : SendResetPasswordDto) : Promise<boolean> {
     try {
          await this.transporter.sendMail({
               from : mainConfig.mail.mailAccount,
               to : data.email,
               text : "",
               html : `
                    <div>
                        <h1>Ссылка для восстановления пароля</h1>
                        <a href=${mainConfig.server.host}/api/auth/confirm/link:${data.value}> link </a>
                    </div>
               `
          })
          return true;
       } catch (e) {
          return false;
       }
     
    }

}