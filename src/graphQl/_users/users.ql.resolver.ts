import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { CreateUser, Users } from "src/shared/graphql/users.schema";
import { UsersQlService } from "./users.ql.service";

@Resolver()
export class UsersQlResolver{

    constructor(
        private readonly usersServe : UsersQlService
    ){}


    @Query(() => [Users])
    async allUsers(){
        return this.usersServe.getAll()
    }


    @Mutation(() => Users)
    async createUser(@Args("args") newUser : CreateUser)
    {
        return this.usersServe.createUser(newUser)
    }
   
   
}