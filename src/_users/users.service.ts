import { Inject, Injectable } from "@nestjs/common";
import { HttpException, InternalServerErrorException, NotFoundException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { NewUserDTO } from "src/shared/dto/users/NewUser.dto";
import { UsersEntity } from "src/shared/entities/users/Users.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService{


    constructor(
        @InjectRepository(UsersEntity) private usersRepo : Repository<UsersEntity>,
    ){}
    


    async checkUserByPseudo(pseudo : string) : Promise<boolean>
    {
        return this.usersRepo.findOneOrFail({
            select : { id : true},
            where : { pseudo : pseudo }
        })
        .then(_ => {
            return true
        })
        .catch(_ => {
            return false
        })
    }



    async createUser(newUser : NewUserDTO) : Promise<NewUserDTO>
    {
        if(await this.checkUserByPseudo(newUser.pseudo))
            throw new NotFoundException("User already exist")
        
        let createdUser : UsersEntity = this.usersRepo.create(newUser)
        
        return this.usersRepo.save(createdUser)
        .catch(_ => { 
            console.log(_)
            throw new InternalServerErrorException("erreur inconnue")
        })
    }


    
}


