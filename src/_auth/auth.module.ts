import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt/dist";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "src/shared/entities/users/Users.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JWT_SECRET } from "./sercret";

@Module({
    imports : [
        TypeOrmModule.forFeature([
            UsersEntity,
        ]),
        JwtModule.register({
            global : true,
            secret : JWT_SECRET,
            signOptions : { expiresIn : '3600s' }
        })
    ],
    controllers : [AuthController],
    providers : [AuthService, JwtService],
})
export class AuthModule{}