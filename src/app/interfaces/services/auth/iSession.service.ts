import { Session } from "../../../../domain";
import { GetSessionQuerry } from "../../../querry";
import { ISessionCreationAttribute } from "../../creationAttibutes";



export interface ISessionService {
    create (dto : ISessionCreationAttribute) : Promise<Session>;
    get ( querry : GetSessionQuerry) : Promise<Session[]>;
    deleteById (id : number) : Promise<void>;
    deleteByRefresh (refreshToken : string) : Promise<void>;
    deleteByfingerprint (fingerprint : string) : Promise<void>;
}