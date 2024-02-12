import { IActivationCreationAttribute, IActivationRepository,GetActivationQuerry,ActivationTarget } from "../../../app"
import { Activation } from "../../../domain";
import { ActivationModel } from "../models";



export class ActivationRepository implements IActivationRepository{
    
    async create(dto: IActivationCreationAttribute): Promise<Activation> {
        return await ActivationModel.create(dto);
    }

    async get(querry: GetActivationQuerry): Promise<Activation[]> {
        if (querry.target === ActivationTarget.id) {
            return await ActivationModel.findAll({where : { id : querry.value}});
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


        if (querry.target === ActivationTarget.accountId) {
            condition.where =  {};
            condition.where.accountId = querry.value;
        }
        if (querry.target == ActivationTarget.link) {
            condition.where =  {};
            condition.where.link = querry.value;
        } 
        console.log(condition);
        const accs = await ActivationModel.findAll(condition);
        return accs;
    }
  
    async update (data : Activation) : Promise<Activation> {
        await ActivationModel.update(data,{where : {id : data.id}});
        const responce = (await ActivationModel.findByPk(data.id)) as Activation;
        return responce; 
    }
}
