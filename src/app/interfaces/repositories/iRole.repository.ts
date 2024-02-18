import { Role } from "../../../domain";
import { GetRoleQuerry } from "../../querry/getRole.querry";
import { IRoleCreationAttribute } from "../creationAttibutes";

export interface IRoleRepository {
    create ( dto : IRoleCreationAttribute ) : Promise<Role>;
    delete ( id : number ) : Promise<boolean>;
    get( querry? : GetRoleQuerry) : Promise<Role[]>;
}