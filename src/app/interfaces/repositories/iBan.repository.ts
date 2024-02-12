import { Ban } from "../../../domain";
import { IBanCreationAttribute } from "../creationAttibutes";



export interface IBanRepository {
    create ( dto : IBanCreationAttribute ) : Promise<Ban>;
    delete ( id : string ) : Promise<boolean>;
    update ( account : Ban) : Promise<Ban>;
    get( querry : any) : Promise<Ban[]>;
}