
import { Activation } from "../../../domain";
import { IActivationCreationAttribute } from "../creationAttibutes";

export interface IActivationRepository {
    create (dto : IActivationCreationAttribute) : Promise<Activation>;
    update (data : Activation) : Promise<Activation>;
    get(querry: any): Promise<Activation[]>;
}