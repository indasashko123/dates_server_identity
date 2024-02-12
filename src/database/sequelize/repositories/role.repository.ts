import { IRoleCreationAttribute } from "../../../app";
import { IRoleRepository } from "../../../app/interfaces/repositories/iRole.repository";
import { RoleModel } from "../models";



export class RoleRepository implements IRoleRepository{
    
    async create(dto: IRoleCreationAttribute): Promise<RoleModel> {
        return await RoleModel.create(dto);
    }

    async delete(id: string): Promise<boolean> {
        const delAcc = await RoleModel.destroy({where : {id : id}});
        if (delAcc) return true;
        return false;
    }

    async update(role: RoleModel): Promise<RoleModel> {
        await RoleModel.update(role,{where : {id : role.id}});
        return await RoleModel.findByPk(role.id);
    }
    async get(querry : any) : Promise<RoleModel[]> {
        return await RoleModel.findAll({where : querry})
    }
}