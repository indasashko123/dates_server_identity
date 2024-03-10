import { Profile } from "../../../../domain";
import { UpdateProfileDto } from "../../../dto";
import { GetProfileQuerry } from "../../../querry";
import { IProfileCreationAttribute } from "../../creationAttibutes";


export interface IProfileService {
    get(querry? : GetProfileQuerry) : Promise<Profile[]>;
    create ( dto : IProfileCreationAttribute ) : Promise<Profile>;
    update(profile : UpdateProfileDto) : Promise<Profile>;
    delete(id : number) : Promise<boolean>;
}