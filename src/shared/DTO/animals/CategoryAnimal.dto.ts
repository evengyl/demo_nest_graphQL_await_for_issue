import { ApiProperty } from "@nestjs/swagger/dist"
import { IsDefined, IsOptional } from "class-validator"
import { AnimalsEntity } from "src/shared/entities/animals/Animals.entity"
import { AnimalDTO } from "./Animal.dto"

export class CategoryAnimalDTO{

    @IsOptional()
    id : number

    @IsDefined()
    @ApiProperty({ example : "souris"})
    name : string

    @IsOptional()
    rangeAge : string

    @IsOptional()
    animals : AnimalDTO[]
}