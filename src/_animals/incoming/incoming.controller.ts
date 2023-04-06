import { ArgumentsHost, Body, Catch, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query, UseGuards, ValidationPipe} from "@nestjs/common";
import { ParseIntPipe } from "@nestjs/common/pipes";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger/dist";
import { AnimalDTO } from "src/shared/DTO/animals/Animal.dto";
import { AnimalId } from "src/shared/DTO/animals/AnimalId";
import { CategoryAnimalDTO } from "src/shared/DTO/animals/CategoryAnimal.dto";
import { CreateAnimalDTO } from "src/shared/DTO/animals/CreateAnimal.dto";
import { UpdateAgeAnimalDTO } from "src/shared/DTO/animals/UpdateAgeAnimal.dto";
import { AuthGuard } from "src/_auth/auth.guard";
import { UpdateResult } from "typeorm";
import { IncomingService } from "./incoming.service";

export enum categPossible{
    CHIENT = 1,
    CHAT = 2,
    DAUPHIN = 3,
    RAT = 8,
    SAURIS = 10
}

@ApiTags("Gestion des animaux de la SPA")
@Controller("api/incoming")
export class IncomingController{
    
    
    constructor(
        private readonly incomingServe : IncomingService
    ){}


    @UseGuards(AuthGuard) //-> gardien de route (middlawe jwt de nest !!!)
    @ApiBearerAuth("access_token")
    @ApiOperation({ summary : "Get all des animaux de la spa"})
    @ApiQuery({ name : "colorfilter",  required : false })
    @ApiQuery({ name : "weightFilter",  required : false })
    @ApiResponse({ type : AnimalDTO})
    @Get()
    getAll(
        @Query("colorfilter") colorFilter : boolean,
        @Query("weightFilter") weightFilter : boolean,
    ) : Promise<[AnimalDTO[] , number]>
    {
        return this.incomingServe.getAll()
    }


    @ApiOperation({ summary : "Get one animal par son id"})
    @ApiParam({ required : true, name : "animalId", example : "2" })
    @ApiResponse({ type : AnimalDTO})
    @Get(":animalId")
    async getOne( 
        @Param("animalId", ParseIntPipe) animalId : AnimalId
    ) : Promise<AnimalDTO>
    {
        let result = await this.incomingServe.getOne(animalId)


        if(!result) throw new NotFoundException("Not found animal")
        else return result
    }

    /**
     * get all animal by categ
     * @param categoryId 
     */
    @ApiOperation({ summary : "Récup les animaux par un category id 1 = chat, 2 = chien"})
    @ApiParam({ required : true, name : "categoryId", enum : categPossible, enumName :"categPossible"})
    @ApiResponse({ type : CategoryAnimalDTO})
    @Get("categ/:categoryId")
    async getAllByCateg(
        @Param("categoryId") categoryId : number
    ) : Promise<CategoryAnimalDTO>
    {
        return await this.incomingServe.getAllByCateg(categoryId)
    }


    @UseGuards(AuthGuard)
    @ApiBearerAuth("access_token")
    @ApiOperation({ summary : "Création d'un animal"})
    @ApiBody({ type : CreateAnimalDTO})
    @ApiResponse({ type : AnimalDTO})
    @Post(":userId")
    incomingNew(
        @Body(ValidationPipe) newArrival : CreateAnimalDTO
    ) : Promise<AnimalDTO>
    {
        return this.incomingServe.incomingNew(newArrival)
    }


    @UseGuards(AuthGuard)
    @ApiBearerAuth("access_token")
    @Put(":animalId/:userId")
    @ApiOperation({ summary : "Modification de l'age d'un animal"})
    @ApiBody({ type : UpdateAgeAnimalDTO})
    @ApiResponse({ type : AnimalDTO})
    @ApiParam({ required : true, name : "animalId", example : "2"})
    updateAge(
        @Param("animalId", ParseIntPipe) animalId : AnimalId,
        @Body(ValidationPipe) newAge : UpdateAgeAnimalDTO
    ) : Promise<AnimalDTO>
    {
        return this.incomingServe.updateAge(animalId, newAge)
    }


    @Delete(":animalId")
    @ApiResponse({ type : UpdateResult})
    @ApiParam({ required : true, name : "animalId", example : "2"})
    deceasedAnimal(
        @Param("animalId") animalId : AnimalId
    ) : Promise<UpdateResult>
    {
        return this.incomingServe.deceasedAnimal(animalId)
//DEAD DE PUPUCE
    }


    @Put("revive/:animalId")
    @ApiResponse({ type : AnimalDTO})
    @ApiParam({ required : true, name : "animalId", example : "2"})
    zombieAnimal(
        @Param("animalId") animalId : AnimalId
    ) : Promise<AnimalDTO>
    {
        return this.incomingServe.zombieAnimal(animalId)
//Walking dead DE PUPUCE
    }


}