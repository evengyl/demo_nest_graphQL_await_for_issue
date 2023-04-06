import { ApiProperty } from "@nestjs/swagger"
import { IsDefined, IsNumber, IsString, MaxLength, MinLength } from "class-validator"
import { CategoryAnimalDTO } from "./CategoryAnimal.dto"


export class AnimalDTO{

    @IsNumber()
    @IsDefined()
    id : number

    @IsString()
    @IsDefined()
    @MaxLength(15)
    @MinLength(2)
    @ApiProperty({ example : "Petito"})
    name : string

    @IsDefined()
    category : CategoryAnimalDTO

    @IsString()
    @IsDefined()
    @MaxLength(2)
    @MinLength(1)
    @ApiProperty({ example : "5"})
    age : string

    @IsString()
    @IsDefined()
    @MaxLength(25)
    @MinLength(2)
    @ApiProperty({ example : "Brussels"})
    cityFound : string
}