
import { Activation } from "../../../domain";
import { GetActivationQuerry } from "../../querry";
import { IActivationCreationAttribute } from "../creationAttibutes";

export interface IActivationRepository {
    create (dto : IActivationCreationAttribute) : Promise<Activation>;
    update (data : Activation) : Promise<Activation>;
    get(querry?: GetActivationQuerry): Promise<Activation[]>;
}