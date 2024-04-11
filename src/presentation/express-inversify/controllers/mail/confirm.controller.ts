import { NextFunction, Response } from "express";
import { GetActivationQuerry, IActivationService } from "../../../../app";
import { mainConfig } from "../../../../config";
import { ExtendRequest } from "../../../extensions";
import { inject, injectable } from "inversify";


@injectable()
export class ConfirmController {
    
    constructor(
        @inject("IActivationService") private readonly activationService : IActivationService
    ) {}

    async confirmEmail(req : ExtendRequest, res : Response, next : NextFunction) {
        try {
            const activationValue = req.params.link;
            await this.activationService.confirmEmail({link : activationValue});
            return res.redirect(mainConfig.client.host);
        } catch(e) {
            next(e);    
        }
    }


    async get(req : ExtendRequest, res : Response, next : NextFunction) {
        try {
            const querry = req.body as GetActivationQuerry;

            const activations = await this.activationService.get(querry);

            return res.json(activations).status(200);
        } catch (e) {
            next(e);
        }
    }
}