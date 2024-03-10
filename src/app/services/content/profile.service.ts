import { Profile } from "../../../domain";
import { ProfileTarget } from "../../enums";
import { ApiError } from "../../exceptions";
import { IProfileCreationAttribute, IProfileRepository, IProfileService } from "../../interfaces";
import { GetProfileQuerry } from "../../querry";


export class ProfileService implements IProfileService {
    
    constructor (private readonly profileRepository : IProfileRepository) {}
    
    async get(querry?: GetProfileQuerry): Promise<Profile[]> {
        return await this.profileRepository.get(querry); 
    }

    async create(dto: IProfileCreationAttribute): Promise<Profile> {
        const condidate = await this.profileRepository.get({target : ProfileTarget.accountId, value : dto.accountId});
        if (condidate.length !== 0) {
           throw ApiError.BadRequest("Profile exest");
        }
        return await this.profileRepository.create(dto);
    }

    async update(profile: Profile): Promise<Profile> {
        return await this.update(profile);
    }

    async delete(id: number): Promise<boolean> {
        return await this.profileRepository.delete(id);
    }
    
}