import { Injectable } from "@nestjs/common";
import { UsersDTO } from "src/shared/DTO/Users.dto";

let users : UsersDTO[] = [
    { id : 1, name : "tutu", pseudo : "tutu" },
    { id : 1, name : "tata", pseudo : "tata" },
    { id : 1, name : "titi", pseudo : "titi" },
    { id : 1, name : "tete", pseudo : "tete" }
]


@Injectable()
export class UsersQlService{

    constructor(){}

    async getAll() : Promise<UsersDTO[]>
    {
        return users
    }

    async createUser(newUser : UsersDTO) : Promise<UsersDTO>
    {
        users.push(newUser)
        return users[users.length]
    }
}


