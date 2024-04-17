import { inject, injectable } from "inversify";
import { 
    AuthService, IAccountRoleRepository, 
    IAccountService, ISessionService, 
    ITokenService } from "../../../../app";

@injectable()
export class AuthInjectableService extends AuthService {
    constructor (
        @inject("IAccountService") accountService : IAccountService,
        @inject("ITokenService") tokenService : ITokenService,
        @inject("ISessionService") sessionService : ISessionService, 
    ) {
        super(
            accountService, tokenService, sessionService
        )
    }
}