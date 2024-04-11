import { inject, injectable } from "inversify";
import { ISessionRepository, SessionService } from "../../../../../app";


@injectable()
export class SessionInjectableService extends SessionService {
    
    constructor (
        @inject("ISessionRepository") sessionRepository : ISessionRepository) {
            super(sessionRepository);
        }
    
}