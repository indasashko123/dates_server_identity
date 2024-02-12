import { Role } from "../../../domain";
import { IRoleCreationAttribute } from "../creationAttibutes";

export interface IRoleRepository {
    create ( dto : IRoleCreationAttribute ) : Promise<Role>;
    delete ( id : string ) : Promise<boolean>;
    update ( account : Role) : Promise<Role>;
    get( querry : any) : Promise<Role[]>;
}