import { NextFunction, Response } from "express";
import { GetActivationQuerry, activationService } from "../../../../../app";
import { mainConfig } from "../../../../../config";
import { ExtendRequest } from "../../../extensions";

export class ConfirmController {
    

    async confirmEmail(req : ExtendRequest, res : Response, next : NextFunction) {
        try {
            const activationValue = req.params.link;
            await activationService.confirmEmail({link : activationValue});
            return res.redirect(mainConfig.client.host);
        } catch(e) {
            next(e);    
        }
    }


    async get(req : ExtendRequest, res : Response, next : NextFunction) {
        try {
            const querry = req.body as GetActivationQuerry;

            const activations = await activationService.get(querry);

            return res.json(activations).status(200);
        } catch (e) {
            next(e);
        }
    }
}