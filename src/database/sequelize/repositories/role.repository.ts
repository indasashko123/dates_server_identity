import { RoleModel } from "../models";



export class RoleRepository {
    async get(querry : any) : Promise<RoleModel[]> {
        return await RoleModel.findAll({where : querry})
    }
}