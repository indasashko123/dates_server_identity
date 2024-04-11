import { inject, injectable } from "inversify";
import { IResetPasswordLinkRepository, IResetPasswordRequestRepository, PasswordService } from "../../../../../app";

@injectable()
export class PasswordInjectableService extends PasswordService {
    
    constructor(
        @inject("IResetPasswordRequestRepository") resetPasswordRequestRepository : IResetPasswordRequestRepository,
        @inject("IResetPasswordLinkRepository") resetPasswordLinkRepository : IResetPasswordLinkRepository
    ) {
        super(resetPasswordRequestRepository,resetPasswordLinkRepository);
    }
    
}