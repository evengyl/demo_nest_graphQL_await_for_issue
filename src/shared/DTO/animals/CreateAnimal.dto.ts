import { OmitType, PartialType, PickType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsDefined, IsString, MaxLength, MinLength } from "class-validator";
import { AnimalDTO } from "./Animal.dto";
import { CategoryAnimalDTO } from "./CategoryAnimal.dto";

//La fonction OmitType() construit un type en sélectionnant toutes les propriétés d'un type d'entrée, 
//puis en supprimant un ensemble particulier de clés. Par exemple, 
//supposons que nous commencions avec un type comme :

export class CreateAnimalDTO{


    @IsString()
    @IsDefined()
    @MaxLength(15)
    @MinLength(2)
    @ApiProperty({ example : "Petito"})
    name : string

    @IsDefined()
    @ApiProperty()
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

//export class CreateAnimalDTO extends OmitTye(AnimalDTO, ["id"]){}