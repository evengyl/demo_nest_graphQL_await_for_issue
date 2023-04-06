import { Module } from "@nestjs/common";
import { UsersQlResolver } from "./users.ql.resolver";
import { UsersQlService } from "./users.ql.service";

@Module({
    imports : [],
    providers : [UsersQlService, UsersQlResolver]
})
export class UsersQlModule{}