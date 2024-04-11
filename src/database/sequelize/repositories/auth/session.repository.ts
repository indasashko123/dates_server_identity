import { 
    GetSessionQuerry, ISessionCreationAttribute, 
    ISessionRepository, SessionTarget } from "../../../../app";
import { QuerryCreator } from "../../../../app/utills";
import { Session } from "../../../../domain";
import { SessionModel } from "../../models";

interface conditions {
    limit? : number;
    offset? : number;
    where? : {
        id? : number | string;
        refreshToken? : string;
        fingerprint? : string;
    }
}
export class SessionRepository implements ISessionRepository{
    
    async get(querry : GetSessionQuerry) : Promise<Session[]> {
        
        const condition : conditions = QuerryCreator.create({},querry) as conditions;
        
        if (!querry && !querry.value) {
            return await SessionModel.findAll(condition) as Session[];
        }
        if (querry.target === SessionTarget.id) {
            condition.where.id = Number(querry.value);
        }
        if (querry.target === SessionTarget.fingerprint) {
            condition.where.fingerprint = String(querry.value);
        }
        if (querry.target === SessionTarget.refreshToken) {
            condition.where.refreshToken = String(querry.value);
        }
        return await SessionModel.findAll(condition) as Session[];
    }
    
    async create(dto : ISessionCreationAttribute) : Promise<Session> {
        return await SessionModel.create(dto) as Session;
    }

    async delete(id : number) : Promise<void> {
        const delAcc = await SessionModel.destroy({where : {id : id}});
    }

}


export const sessionRepository = new SessionRepository();
