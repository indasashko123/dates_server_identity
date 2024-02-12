import { Account } from "../../../../domain";
import { GetAccountQuerry } from "../../../querry";
import { IAccountCreationAttribute } from "../../creationAttibutes";



export interface IAccountService {
    get(querry : GetAccountQuerry) : Promise<Account[]>;
    create ( dto : IAccountCreationAttribute ) : Promise<Account>;
    getRolesNames(id : string) : Promise<string[]>;
}