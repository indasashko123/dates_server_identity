import { CreateAccountRoleDto } from "../../dto";
import { accountRole } from "../../../domain";




export interface IAccountRoleRepository {
    create (dto : CreateAccountRoleDto) : Promise<accountRole>;
}