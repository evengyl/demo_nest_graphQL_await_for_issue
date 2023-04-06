import { ApiProperty } from "@nestjs/swagger"
import { IsDefined, IsString } from "class-validator"

export class AuthUserDTO{
    
    @IsString()
    @IsDefined()
    @ApiProperty({ example : "evengyl"})
    pseudo : string

    @IsString()
    @IsDefined()
    @ApiProperty({ example : "Test1234_"})
    password : string
}