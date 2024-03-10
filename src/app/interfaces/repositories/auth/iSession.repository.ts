import { Session } from "../../../../domain"
import { GetSessionQuerry } from "../../../querry"
import { ISessionCreationAttribute } from "../../creationAttibutes"


export interface ISessionRepository {
    get(querry : GetSessionQuerry) : Promise<Session[]>;
    create(dto : ISessionCreationAttribute) : Promise<Session>;
    delete(id : number) : Promise<void>;
}