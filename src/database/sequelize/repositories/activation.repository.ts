import { IActivationCreationAttribute, IActivationRepository,GetActivationQuerry,ActivationTarget } from "../../../app"
import { Activation } from "../../../domain";
import { ActivationModel } from "../models";

interface conditions {
    limit? : number;
    offset? : number;
    where? : {
        id? : number | string;
        link? : string;
        accountId? : string;
    }
}

export class ActivationRepository implements IActivationRepository{
    
    async create(dto: IActivationCreationAttribute): Promise<Activation> {
        return await ActivationModel.create(dto) as Activation;
    }

    async get(querry?: GetActivationQuerry): Promise<Activation[]> {
        if (!querry) {
            return await ActivationModel.findAll() as Activation[];
        }
        if (querry.target === ActivationTarget.id) {
            return await ActivationModel.findAll({where : { id : querry.value}}) as Activation[];
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


        if (querry.target === ActivationTarget.accountId) {
            condition.where =  {};
            condition.where.accountId = String(querry.value);
        }
        if (querry.target == ActivationTarget.link) {
            condition.where =  {};
            condition.where.link = String(querry.value);
        } 
        const accs = await ActivationModel.findAll(condition) as Activation[];
        return accs;
    }
  
    async update (data : Activation) : Promise<Activation> {
        await ActivationModel.update({
            isEmailConfirmed : data.isEmailConfirmed
        },{where : {id : data.id}});
        const responce = (await ActivationModel.findByPk(data.id)) as Activation;   
        return responce; 
    }
}
