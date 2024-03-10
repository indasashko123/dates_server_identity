import { 
    IRoleCreationAttribute, RoleTarget, 
    IRoleRepository, GetRoleQuerry
} from "../../../../app";
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
        if (!querry) {
            return await RoleModel.findAll();
        }
        if (querry.target === RoleTarget.id) {
            return await RoleModel.findAll({where : { id : querry.value}});
        }
        const condition : conditions = { where : {}};

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
        
        if (querry.target === RoleTarget.name) {
            condition.where.name = String(querry.value);
        }

        return await RoleModel.findAll(condition)
    }
}