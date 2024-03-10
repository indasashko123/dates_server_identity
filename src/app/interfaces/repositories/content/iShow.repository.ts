import { Show } from "../../../../domain";
import { GetShowQuerry } from "../../../querry";
import { IShowCreationAttribute } from "../../creationAttibutes";



export interface IShowRepository {
    create ( dto : IShowCreationAttribute ) : Promise<Show>;
    delete ( id : number ) : Promise<boolean>;
    update ( profile : Show) : Promise<Show>;
    get( querry? : GetShowQuerry) : Promise<Show[]>;
}