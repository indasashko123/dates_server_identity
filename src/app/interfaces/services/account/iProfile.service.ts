import { Profile } from "../../../../domain";
import { GetProfileQuerry } from "../../../querry/getProfile.querry";
import { IProfileCreationAttribute } from "../../creationAttibutes";


export interface IProfileService {
    get(querry? : GetProfileQuerry) : Promise<Profile[]>;
    create ( dto : IProfileCreationAttribute ) : Promise<Profile>;
    update(profile : Profile) : Promise<Profile>;
    delete(id : number) : Promise<boolean>;
}