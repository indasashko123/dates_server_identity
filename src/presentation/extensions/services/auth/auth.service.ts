import { inject, injectable } from "inversify";
import { AuthService, IAccountRoleRepository, IAccountService, IActivationService, IMailService, IPasswordService, ISessionService, ITokenService } from "../../../../../app";

@injectable()
export class AuthInjectableService extends AuthService {


    constructor (
        @inject("IAccountService") accountService : IAccountService,
        @inject("IActivationService") activationService : IActivationService,
        @inject("IMailService") mailService : IMailService,
        @inject("ITokenService") tokenService : ITokenService,
        @inject("IAccountRoleRepository") accountRoleRepository : IAccountRoleRepository,
        @inject("IPasswordService") passwordService  : IPasswordService,
        @inject("ISessionService") sessionService : ISessionService, 
    ) {
        super(
            accountService, activationService, mailService, 
            tokenService, accountRoleRepository, passwordService, sessionService
        )
    }



}




