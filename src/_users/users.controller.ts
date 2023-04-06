import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { NewUserDTO } from "src/shared/dto/users/NewUser.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger/dist";


@ApiTags("Users")
@Controller("api/users")
export class UsersController{

    constructor(
        private readonly usersServe : UsersService,
    ) {}



    @ApiOperation({ summary : "Create new User"})
    @Post()
    createUser(@Body(ValidationPipe) newUser : NewUserDTO) : Promise<NewUserDTO>
    {
        return this.usersServe.createUser(newUser)
    }
}