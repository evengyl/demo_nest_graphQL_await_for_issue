import { IsDefined, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class UsersDTO{

    @IsOptional()
    @IsNumber()
    id? : number

    @IsDefined()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    //@Length(3,50) same que Minlength et MaxLength
    name : string

    @IsDefined()
    @IsString()
    @MinLength(6)
    @MaxLength(15)
    pseudo : string

}