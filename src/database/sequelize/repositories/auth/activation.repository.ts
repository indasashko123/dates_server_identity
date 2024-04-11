import { 
    IActivationCreationAttribute, IActivationRepository,
    GetActivationQuerry,ActivationTarget } from "../../../../app"
import { QuerryCreator } from "../../../../app/utills";
import { Activation } from "../../../../domain";
import { ActivationModel } from "../../models";

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

        const condition : conditions = QuerryCreator.create({},querry) as conditions;
        
        if (!querry || !querry.value) {
            return await ActivationModel.findAll(condition) as Activation[];
        }
        if (querry.target === ActivationTarget.id) {
           condition.where.id = Number(querry.value);
        }
        if (querry.target === ActivationTarget.accountId) {
            condition.where.accountId = String(querry.value);
        }
        if (querry.target == ActivationTarget.link) {
            condition.where.link = String(querry.value);
        } 
        return await ActivationModel.findAll(condition) as Activation[];
    }
  
    async update (data : Activation) : Promise<Activation> {
        await ActivationModel.update({
            isEmailConfirmed : data.isEmailConfirmed
        },{where : {id : data.id}});
        const responce = (await ActivationModel.findByPk(data.id)) as Activation;   
        return responce; 
    }
}



export const activationRepository = new ActivationRepository();