import { Ban } from "../../../../domain";
import { IBanCreationAttribute } from "../../creationAttibutes";




export interface IBanService {
    ban (data : IBanCreationAttribute) : Promise<Ban>;
}