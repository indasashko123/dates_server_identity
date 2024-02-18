import { Ban } from "../../../domain";
import { GetBanQuerry } from "../../querry";
import { IBanCreationAttribute } from "../creationAttibutes";



export interface IBanRepository {
    create ( dto : IBanCreationAttribute ) : Promise<Ban>;
    delete ( id : string | number ) : Promise<boolean>;
    get( querry? : GetBanQuerry) : Promise<Ban[]>;
}