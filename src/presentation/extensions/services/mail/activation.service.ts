import { inject, injectable } from "inversify";
import { ActivationService, IActivationRepository } from "../../../../../app";

@injectable()
export class ActivationInjectableService extends ActivationService {


    constructor (
        @inject("IActivationRepository") activationRepository : IActivationRepository
    ){
        super(activationRepository);
    }

}