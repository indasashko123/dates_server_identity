import { GetActivationQuerry } from "../../common";
import { ActivationModel } from "../../database";
import { IActivationCreationAttribute } from "../creationAttibutes";

export interface IActivationRepository {
    create (dto : IActivationCreationAttribute) : Promise<ActivationModel>;
    update (data : ActivationModel) : Promise<ActivationModel>;
    get(querry: any): Promise<ActivationModel[]>;
}