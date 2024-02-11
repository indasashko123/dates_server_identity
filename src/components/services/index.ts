import { AccountService } from "./account";
import { AuthService, TokenService } from "./auth";
import { ActivationService } from "./mail/activation.service";
import { MailService } from "./mail/mail.service";


export * from "./account";
export * from "./auth";
export * from "./mail";


/// AUTH
export const authService = new AuthService();
export const tokenService = new TokenService();


///MAIL
export const activationService = new ActivationService();
export const mailService = new MailService();


/// ACCOUNT
export const accountService = new AccountService();