import { IBanCreationAttribute, IBanRepository,GetBanQuerry,BanTarget } from "../../../app";
import { Ban } from "../../../domain";
import { BanModel } from "../models";

interface conditions {
    limit? : number;
    offset? : number;
    where? : {
        id? : number | string;
        userId? : string ;
        moderatorId? : string;
    }
}


export class BanRepository implements IBanRepository  {
    async create(dto: IBanCreationAttribute): Promise<Ban> {
        const ban  = await BanModel.create(dto);
        return ban;
    }

    async delete(id: string | number): Promise<boolean> {
        const delAcc = await BanModel.destroy({where : {id : id}});
        if (delAcc) return true;
        return false;
    }

    async get(querry?: GetBanQuerry): Promise<Ban[]> {
        if (!querry) {
            return await BanModel.findAll();
        }
        if (querry.target === BanTarget.id) {
            return await BanModel.findAll({where : { id : querry.value}});
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


        if (querry.target === BanTarget.moderatorId) {
            condition.where.moderatorId = String(querry.value);
        }
        if (querry.target == BanTarget.userId) {
            condition.where.userId = String(querry.value);
        }

        const accs = await BanModel.findAll(condition);
        return accs;
    }
 
    

}