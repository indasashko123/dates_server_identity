import { Activation } from "../../../../domain";
import { ActivationCreateDto, ConfirmEmailDto } from "../../../dto";
import { GetActivationQuerry } from "../../../querry";

export interface IActivationService {

    createLink (dto : ActivationCreateDto) : Promise<string> ;
    confirmEmail(dto : ConfirmEmailDto) : Promise<void>;
    get(querry : GetActivationQuerry) : Promise<Activation[]>;
}