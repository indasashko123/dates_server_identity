import { GetSessionQuerry, ISessionCreationAttribute, ISessionRepository, SessionTarget } from "../../../../app";
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
        if (!querry) {
            const sessions =  await SessionModel.findAll() as Session[];
            return sessions;
        }
        if (querry.target === SessionTarget.id) {
            const sessions = await SessionModel.findAll({where : { id : querry.value}}) as Session[];
            return sessions;
        }
        let condition : conditions = {
            where : {}
        };
        if (!querry.page) {
            condition.offset = 0;
        } else {
            condition.offset = (querry.page-1)*querry.perPage;
        }
        if (!querry.perPage) {
            condition.limit = 25;
        } else {
            condition.limit = querry.perPage;
        }
        if (querry.target === SessionTarget.fingerprint) {
            condition.where.fingerprint = String(querry.value);
        }
        if (querry.target === SessionTarget.refreshToken) {
            condition.where.refreshToken = String(querry.value);
        }
        const sessions = await SessionModel.findAll(condition) as Session[];
        return sessions;
    }
    
    async create(dto : ISessionCreationAttribute) : Promise<Session> {
        return await SessionModel.create(dto) as Session;
    }

    async delete(id : number) : Promise<void> {
        const delAcc = await SessionModel.destroy({where : {id : id}});
    }

}