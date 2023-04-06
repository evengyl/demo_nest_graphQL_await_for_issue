import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthUserDTO } from "src/shared/DTO/users/AuthUser.dto";
import { UsersEntity } from "src/shared/entities/users/Users.entity";
import { Repository } from "typeorm";
import { JWT_SECRET } from "./sercret";

@Injectable()
export class AuthService{

    constructor(
        @InjectRepository(UsersEntity) private usersRepo : Repository<UsersEntity>,
        private jwtService: JwtService
    ){}

    async login(user : AuthUserDTO) : Promise<{access_token}>
    {

        let userFound = await this.usersRepo.findOneOrFail({
            where : { pseudo : user.pseudo }
        })
        .catch(_ => { throw new NotFoundException("User not exist")})

        if(user.password == userFound.password)
        {
            //l'authentifier ici !
            const payload = { pseudo: userFound.pseudo, sub: userFound.id };
            return {
                access_token: await this.jwtService.signAsync(payload, { secret : JWT_SECRET}),
            }
        }
        else{
            throw new UnauthorizedException("User password not correct")
        }
    }
}


