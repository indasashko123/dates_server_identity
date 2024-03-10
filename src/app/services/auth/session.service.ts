import { Session } from "../../../domain";
import { SessionTarget } from "../../enums";
import { ISessionCreationAttribute, ISessionRepository, ISessionService } from "../../interfaces";
import { GetSessionQuerry } from "../../querry";


export class SessionService implements ISessionService {
    
    constructor (private readonly sessionRepository : ISessionRepository) {}
    
    async create (dto : ISessionCreationAttribute) : Promise<Session> {
        return await this.sessionRepository.create(dto);
    }

    async get ( querry : GetSessionQuerry) : Promise<Session[]> {
        return await this.sessionRepository.get(querry);
    }
    async deleteById (id : number) : Promise<void> {
        await this.sessionRepository.delete(id);
    }
    async deleteByRefresh (refreshToken : string) : Promise<void> {
        const session = await this.get({target : SessionTarget.refreshToken, value : refreshToken})
        await this.sessionRepository.delete(session[0].id);
    }
    async deleteByfingerprint (fingerprint : string) : Promise<void> {
        const session = await this.get({target : SessionTarget.fingerprint, value : fingerprint})
        await this.sessionRepository.delete(session[0].id);
    }
}