import { Field, ID, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ObjectType()
export class Users{

    @Field(type => ID)
    id : number

    @Field(type => String)
    name : string

    @Field(type => String)
    pseudo : string
}

@InputType() //equivalant d'un dto de create or update or delete etc, (un schema gql de mutation)
export class CreateUser{


    @Field(type => String)
    //@IsNotEmpty()
    name : string

    @Field(type => String)
    //@IsNotEmpty()
    pseudo : string

    @Field(type => String)
    //@IsNotEmpty()
    password: string
}


