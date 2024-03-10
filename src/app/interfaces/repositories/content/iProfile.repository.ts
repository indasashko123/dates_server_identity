import { Profile } from "../../../../domain";
import { GetProfileQuerry } from "../../../querry";
import { IProfileCreationAttribute } from "../../creationAttibutes";



export interface IProfileRepository {
    create ( dto : IProfileCreationAttribute ) : Promise<Profile>;
    delete ( id : number ) : Promise<boolean>;
    update ( profile : Profile) : Promise<Profile>;
    get( querry? : GetProfileQuerry) : Promise<Profile[]>;
}