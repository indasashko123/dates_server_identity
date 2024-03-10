import { mainConfig } from "../config";
import { accountRepository, accountRoleRepository, activationRepository, resetPasswordLinkRepository, resetPasswordRequestRepository } from "../database";
import { AccountService, ActivationService, AuthService, MailService, TokenService } from "./services";
import { PasswordService } from "./services/account/password.service";
import { MockMailService } from "./services/mail/mock.mail.service";


export * from "./dto";
export * from "./enums";
export * from "./exceptions";
export * from "./interfaces";
export * from "./querry";
export * from "./services";





/// ACCOUNT
export const accountService = new AccountService(accountRepository);
export const passwordService = new PasswordService(resetPasswordRequestRepository,resetPasswordLinkRepository);

///MAIL
export const activationService = new ActivationService(activationRepository);
export const mailService = mainConfig.server.isDev? new MockMailService() : new MailService();

/// AUTH
export const tokenService = new TokenService();
export const authService = new AuthService(
    accountService,
    activationService,
    mailService,
    tokenService,
    accountRoleRepository,
    passwordService
    );




