import { Injectable, NestMiddleware } from "@nestjs/common";
import { NotFoundException, UnauthorizedException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { UsersEntity } from "../entities/users/Users.entity";

@Injectable()
export class CheckUserMiddleware implements NestMiddleware{

    constructor(
        @InjectRepository(UsersEntity) private userRepo : Repository<UsersEntity>
    ){}

    async use(req : Request, res : Response, next : NextFunction)
    {
        let userId = req.params.userId
        
        if(userId != null)
        {
            await this.userRepo.findOneOrFail({
                where : { id : parseInt(userId) }
            })
            .catch(_ => { 
                console.log("#### User Id not Exist ####")
                throw new NotFoundException("User Id not Exist")
            })
            
            console.log("#### User checked ####")
            
            next()
        }
        else
            throw new UnauthorizedException("User id non correct dans le middleware")
    }

}