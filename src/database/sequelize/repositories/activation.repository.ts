import { ActivationTarget } from "../../../common";
import { GetActivationQuerry } from "../../../common/querry";
import { IActivationCreationAttribute, IActivationRepository } from "../../../interfaces";
import { ActivationModel } from "../models";



export class ActivationRepository implements IActivationRepository{
    
    async create(dto: IActivationCreationAttribute): Promise<ActivationModel> {
        return await ActivationModel.create(dto);
    }

    async get(querry: GetActivationQuerry): Promise<ActivationModel[]> {
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
            condition.where.accountId = querry.value;
        }
        if (querry.target == ActivationTarget.value) {
            condition.where.value = querry.value;
        }

        const accs = await ActivationModel.findAll(condition);
        return accs;
    }
  
    async update (data : ActivationModel) : Promise<ActivationModel> {
        await ActivationModel.update(data,{where : {id : data.id}});
        return await ActivationModel.findByPk(data.id);
    }
}