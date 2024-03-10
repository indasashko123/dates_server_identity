import { Session } from "../../../domain";
import { ISessionCreationAttribute, ISessionRepository } from "../../interfaces";
import { GetSessionQuerry } from "../../querry";


export class SessionService {
    
    constructor (private readonly sessionRepository : ISessionRepository) {}
    
    async create (dto : ISessionCreationAttribute) : Promise<Session> {
        return await this.sessionRepository.create(dto);
    }

    async get ( querry : GetSessionQuerry) : Promise<Session[]> {
        return await this.sessionRepository.get(querry);
    }
}