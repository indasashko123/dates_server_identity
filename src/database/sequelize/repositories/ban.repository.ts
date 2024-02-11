import { BanTarget, GetBanQuerry } from "../../../common";
import { IBanCreationAttribute, IBanRepository } from "../../../interfaces";
import { BanModel } from "../models";




export class BanRepository implements IBanRepository  {
    async create(dto: IBanCreationAttribute): Promise<BanModel> {
        const ban  = await BanModel.create(dto);
        return ban;
    }

    async delete(id: string): Promise<boolean> {
        const delAcc = await BanModel.destroy({where : {id : id}});
        if (delAcc) return true;
        return false;
    }

    async update(account: BanModel): Promise<BanModel> {
        await BanModel.update(account,{where : {id : account.id}});
        return await BanModel.findByPk(account.id);
    }

    async get(querry: GetBanQuerry): Promise<BanModel[]> {
        if (querry.target === BanTarget.id) {
            return await BanModel.findAll({where : { id : querry.value}});
        }
        const condition : any = {};

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
            condition.where.moderatorId = querry.value;
        }
        if (querry.target == BanTarget.userId) {
            condition.where.userId = querry.value;
        }

        const accs = await BanModel.findAll(condition);
        return accs;
    }
 
    

}