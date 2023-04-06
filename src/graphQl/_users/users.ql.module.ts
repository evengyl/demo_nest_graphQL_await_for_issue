import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "src/shared/entities/users/Users.entity";
import { UsersQlResolver } from "./users.ql.resolver";
import { UsersQlService } from "./users.ql.service";

@Module({
    imports : [
        TypeOrmModule.forFeature([
            UsersEntity,
        ])
    ],
    providers : [UsersQlService, UsersQlResolver]
})
export class UsersQlModule{}