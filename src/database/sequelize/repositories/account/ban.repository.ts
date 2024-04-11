import { 
    IBanCreationAttribute, IBanRepository,
    GetBanQuerry,BanTarget } from "../../../../app";
import { QuerryCreator } from "../../../../app/utills";
import { Ban } from "../../../../domain";
import { BanModel } from "../../models";

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

        const condition : conditions = QuerryCreator.create({},querry) as conditions;
    
        if (!querry || !querry.value) {
            return await BanModel.findAll(condition) as Ban[];
        }
        if (querry.target === BanTarget.id) {
            condition.where.id = Number(querry.value);
        }
        if (querry.target === BanTarget.moderatorId) {
            condition.where.moderatorId = String(querry.value);
        }
        if (querry.target == BanTarget.userId) {
            condition.where.userId = String(querry.value);
        }
        const bans = await BanModel.findAll(condition) as Ban[];
        return bans;
    }
}

export const banRepository = new BanRepository();