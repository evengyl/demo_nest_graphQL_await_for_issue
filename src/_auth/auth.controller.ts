import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger/dist";
import { AuthUserDTO } from "src/shared/DTO/users/AuthUser.dto";
import { UsersService } from "src/_users/users.service";
import { AuthService } from "./auth.service";


@ApiTags("Auth")
@Controller("api/auth")
export class AuthController{

    constructor(
        private readonly authServe : AuthService
    ) {}

    @ApiBody({ type : AuthUserDTO})
    @ApiOperation({ summary : "Login du user"})
    @Post()
    async login(
        @Body(ValidationPipe) loginUser : AuthUserDTO
    ) : Promise<{access_token}>
    {
        return await this.authServe.login(loginUser)
    }
}