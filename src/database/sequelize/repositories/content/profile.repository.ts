import { GetProfileQuerry, IProfileCreationAttribute, IProfileRepository, ProfileTarget } from "../../../../app";
import { Profile } from "../../../../domain";
import { ProfileModel } from "../../models";

interface conditions {
    limit? : number;
    offset? : number;
    where? : {
        isDeleted? : boolean;
        genderSearch? : string;
        city? : string;
        name? : string;
        accountId? : string;
    }
}


export class ProfileRepository implements IProfileRepository{
    
    async create(dto: IProfileCreationAttribute): Promise<Profile> {
        return await ProfileModel.create(dto);
    }


    async delete(id: number): Promise<boolean> {
        await ProfileModel.update({
            isDeleted : true,
        }, {where : {
            id
        }});
        return true;
    }


    async update(profile: Profile): Promise<Profile> {
            await ProfileModel.update({
            about : profile.about,
            city : profile.city,
            genderSearch : profile.genderSearch,
            name : profile.name    
        },{where : {id : profile.id}});
        return await ProfileModel.findByPk(profile.id) as Profile;    
    }


    async get(querry?: GetProfileQuerry): Promise<Profile[]> {
        if (!querry) {
            const profiles =  await ProfileModel.findAll({where : {isDeleted : false}}) as Profile[];
            return profiles;
        }
        if (querry.target === ProfileTarget.id) {
            const deleted = !querry.isDeleted ? false : true;
            const profiles = await ProfileModel.findAll({where : { id : querry.value, isDeleted : deleted}}) as Profile[];
            return profiles;
        }
        let condition : conditions = {
            where : {}
        };

        if (!querry.isDeleted) {
            condition.where.isDeleted = false;
        } 

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


        if (querry.target === ProfileTarget.city) {
            condition.where.city = String(querry.value);
        }
        if (querry.target === ProfileTarget.genderSearch) {
            condition.where.genderSearch = String(querry.value);
        }
        if (querry.target === ProfileTarget.name) {
            condition.where.name = String(querry.value);
        }
        if (querry.target === ProfileTarget.accountId) {
            condition.where.accountId = String(querry.value);
        }

        const profiles = await ProfileModel.findAll(condition) as Profile[];
        return profiles;
    }
}