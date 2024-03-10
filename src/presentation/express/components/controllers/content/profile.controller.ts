import { NextFunction, Response } from "express";
import { ExtendRequest } from "../../../extensions";
import { ApiError, GetProfileQuerry, profileService } from "../../../../../app";
import { validationResult } from "express-validator";


export class ProfileController {

    async create (req : ExtendRequest, res : Response, next : NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {0
                return next(ApiError.BadRequest("Validation error",errors.array()));
            }
            const {about,city,name,genderSearch} = req.body;
            const accountId = req.account.id;
            const profile = await profileService.create({
                about,accountId,city,name,genderSearch
            });
            return res.status(200).json(profile);
        } catch(e) {
           next(e);
        }
    }


    async get(req : ExtendRequest, res : Response, next : NextFunction) {
        try {
            const errors = validationResult(req);
            if (errors.isEmpty()) {0
                return next(ApiError.BadRequest("Validation error",errors.array()));
            }
            const query : GetProfileQuerry = req.query as GetProfileQuerry;
            const profiles = await profileService.get(query);
            return res.json(profiles).status(200);
        } catch(e) {
            next(e);
        }
    }


    async delete(req : ExtendRequest, res : Response, next : NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {0
            return next(ApiError.BadRequest("Validation error",errors.array()));
        }
        const {id} = req.body;
        const isDeleted = await profileService.delete(Number(id));
        if (!isDeleted) {
            return next(ApiError.BadRequest("Can not delete profile"));
        }
        return res.status(200).json({message : "ok", isDeleted : isDeleted});
    }


    async update (req : ExtendRequest, res : Response, next : NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {0
                return next(ApiError.BadRequest("Validation error",errors.array()));
            }
            const {id,about,city,name,genderSearch} = req.body;
            const accountId = req.account.id;
            const profile = await profileService.update({about,accountId,city,genderSearch,id,name});
            return res.status(200).json(profile);
        } catch(e) {
            next(e);
        }
    }
}