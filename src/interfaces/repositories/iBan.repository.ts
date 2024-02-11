import { BanModel } from "../../database";
import { IBanCreationAttribute } from "../creationAttibutes";



export interface IBanRepository {
    create ( dto : IBanCreationAttribute ) : Promise<BanModel>;
    delete ( id : string ) : Promise<boolean>;
    update ( account : BanModel) : Promise<BanModel>;
    get( querry : any) : Promise<BanModel[]>;
}