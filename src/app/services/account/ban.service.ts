import { NextFunction, Response } from "express";
import { ApiError, ExtendRequest } from "../../../common";
import { IBanCreationAttribute } from "../../../interfaces";
import { BanModel, banRepository } from "../../../database";



export class BanService {
    
    async ban (data : IBanCreationAttribute) : Promise<BanModel> {
        try { 
           const ban = await banRepository.create(data);
           return ban;
        } catch (e) {
            throw ApiError.InternalError(e);
        }
    }
}