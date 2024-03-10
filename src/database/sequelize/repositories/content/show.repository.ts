import { GetShowQuerry, IShowCreationAttribute, IShowRepository, ShowTarget } from "../../../../app";
import { Show } from "../../../../domain";
import { ShowModel } from "../../models";
/*
id : number;
performerId : string;
subjectId : string;
result : string;
*/
interface conditions {
    limit? : number;
    offset? : number;
    where? : {
        id? : number;
        performerId? : string;
        subjectId? : string;
        result? : string; 
    }
}


export class ShowRepository implements IShowRepository{
    
    async create(dto: IShowCreationAttribute): Promise<Show> {
        return await ShowModel.create(dto);
    }


    async delete(id: number): Promise<boolean> {
        const delAcc = await ShowModel.destroy({where : {id : id}});
        if (!delAcc) {
            return false;
        }
        return true;
    }


    async update(show: Show): Promise<Show> {
            await ShowModel.update({
            result : show.result    
        },{where : {id : show.id}});
        return await ShowModel.findByPk(show.id) as Show;    
    }


    async get(querry?: GetShowQuerry): Promise<Show[]> {
        if (!querry) {
            return await ShowModel.findAll() as Show[];
        }
        if (querry.target === ShowTarget.id) {
            return await ShowModel.findAll({where : { id : querry.value}}) as Show[];
        }
        let condition : conditions = {
            where : {}
        }; 

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


        if (querry.target === ShowTarget.performerId) {
            condition.where.performerId = String(querry.value);
        }
        if (querry.target === ShowTarget.result) {
            condition.where.result = String(querry.value);
        }
        if (querry.target === ShowTarget.subjectId) {
            condition.where.subjectId = String(querry.value);
        }

        const profiles = await ShowModel.findAll(condition) as Show[];
        return profiles;
    }
}