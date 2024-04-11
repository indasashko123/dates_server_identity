import { 
    IRoleCreationAttribute, RoleTarget, 
    IRoleRepository, GetRoleQuerry
} from "../../../../app";
import { QuerryCreator } from "../../../../app/utills";
import { Role } from "../../../../domain";
import { RoleModel } from "../../models";

interface conditions {
    limit? : number;
    offset? : number;
    where? : {
        id? : number | string;
        name? : string;
    }
}



export class RoleRepository implements IRoleRepository{
    
    async create(dto: IRoleCreationAttribute): Promise<Role> {
        return await RoleModel.create(dto);
    }

    async delete(id: number): Promise<boolean> {
        const delAcc = await RoleModel.destroy({where : {id : id}});
        if (delAcc) return true;
        return false;
    }

    async get(querry? : GetRoleQuerry) : Promise<Role[]> {
        
        const condition : conditions = QuerryCreator.create({},querry) as conditions;
    
        if (!querry || !querry.value) {
            return await RoleModel.findAll(condition) as Role[];
        }

        if (querry.target === RoleTarget.id) {
            condition.where.id = Number(querry.value);
        }
        if (querry.target === RoleTarget.name) {
            condition.where.name = String(querry.value);
        }

        return await RoleModel.findAll(condition) as Role[];
    }
}


export const roleRepository = new RoleRepository();