import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ForbiddenException, HttpException, NotAcceptableException, NotFoundException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { AnimalDTO } from "src/shared/DTO/animals/Animal.dto";
import { AnimalId } from "src/shared/DTO/animals/AnimalId";
import { CategoryAnimalDTO } from "src/shared/DTO/animals/CategoryAnimal.dto";
import { CreateAnimalDTO } from "src/shared/DTO/animals/CreateAnimal.dto";
import { UpdateAgeAnimalDTO } from "src/shared/DTO/animals/UpdateAgeAnimal.dto";
import { AnimalsEntity } from "src/shared/entities/animals/Animals.entity";
import { CategoryAnimalsEntity } from "src/shared/entities/animals/CategoryAnimals.entity";
import { Not, Repository, UpdateResult } from "typeorm";

@Injectable()
export class IncomingService{

    constructor(
        @InjectRepository(AnimalsEntity) private animalRepo : Repository<AnimalsEntity>,
        @InjectRepository(CategoryAnimalsEntity) private categRepo : Repository<CategoryAnimalsEntity>
    ) {}

    async getAll() : Promise<[AnimalDTO[] , number]>{
        let allAnimals : [AnimalDTO[] , number] = await this.animalRepo.findAndCount({
            select : { 
                id : true,
                name : true,
                cityFound : true,
                age : true
            },
            relations : {
                category : true
            }
        })
        .catch((error) => { throw new HttpException("tutu", 404) })

        return allAnimals
    }


    async getOne(animalId : AnimalId) : Promise<AnimalDTO>
    {
        //le findOnyBy, ne permet pas l'utilisation d'un object complet comme le findOne, uniquement en where criteria
        let otherOneAnimal = await this.animalRepo.findOneBy({ id : animalId })
        
        let oneAnimal : AnimalDTO = await this.animalRepo.findOne({
            select : { 
                id : true,
                name : true,
                cityFound : true,
                age : true,
            },
            where : { id : animalId }
        })

        return oneAnimal
    }


    async getAllByCateg(categoryId : number) : Promise<CategoryAnimalDTO>
    {
        // let allAnimalByCateg = await this.animalRepo.find({
        //     where : { 
        //         category : { 
        //             id : categoryId 
        //         }
        //     },
        //     relations : { category : true }
        // })

        // console.log(allAnimalByCateg)
        //return null


        let allAnimalInCategId = await this.categRepo.findOne({
            where : { id : categoryId },
            relations : { animals : true }
        })
         return allAnimalInCategId


    }


    async incomingNew(newArrival : CreateAnimalDTO) : Promise<AnimalsEntity>
    {
        //vérfier que la categ n'existe pas, si pas, la créer
        //ensuite ajouter le incoming animal
        //et synchro le tout pour la relation
        
        let categExist = await this.categRepo.findOne({
            where : { name : newArrival.category.name }
        })
        .catch(_ => { throw new InternalServerErrorException("erreur sql") })

        if(categExist == null){
            //alors on crée la categ
            let newCateg = this.categRepo.create()
            newCateg.name = newArrival.category.name

            categExist = await this.categRepo.save(newCateg)
            .catch(_ => { throw new InternalServerErrorException("erreur sql") })
        }


        let createAnimalEntity = this.animalRepo.create(newArrival)

        createAnimalEntity.category = categExist

        let newArrivalCreated = await this.animalRepo.save(createAnimalEntity)
        .catch(_ => { throw new InternalServerErrorException("erreur sql") })

        return newArrivalCreated
    }


    async updateAge(animalId : AnimalId, updatedAnimal : UpdateAgeAnimalDTO) : Promise<AnimalDTO>
    {
        //Méthode en utilsant la modif de l'entity trouvé en find et puis save()
        
        let foundAnimal : AnimalsEntity = await this.animalRepo.findOneBy({id : animalId})
        
        if(!foundAnimal) throw new NotFoundException("Animal not found")

        foundAnimal.age = updatedAnimal.newAge.toString()

        let result = await this.animalRepo.save(foundAnimal)
        
        console.log(result)
        return result
        
        
        /*
        //méthode avec le update de typeorm
        let result = await this.animalRepo.update({ id : animalId}, { age : updatedAnimal.newAge.toString()}
        //return est de type : UpdateResult et donc le return promise<animalDTO> ne sera plus ok !
        console.log(result)
        return null
        */
        
    }


    async deceasedAnimal(animalId : AnimalId) : Promise<UpdateResult>
    {
        //hard delete ! 
        /*
        let result = await this.animalRepo.delete(animalId)
        */

        //soft delete, ajoute la date de deleteAt dans la db ! attention la colonne @DeleteDateColumn() doit exister
        return await this.animalRepo.softDelete(animalId)



        /*
        //hard delete aussi, mais travail avec une entity venue d'un find, et pas juste un id
        let foundAnimal : AnimalsEntity = await this.animalRepo.findOne({
            where : { id : animalId },
            withDeleted : true
        })
        if(!foundAnimal) throw new NotFoundException("Animal not found")
        let result = await this.animalRepo.remove(foundAnimal)
        console.log(result)
        */
    }


    async zombieAnimal(animalId : AnimalId) : Promise<AnimalDTO>
    {
        //let result = await this.animalRepo.restore(animalId)

        
        let foundAnimal : AnimalsEntity = await this.animalRepo.findOne({
            where : { id : animalId },
            withDeleted : true
        })

        if(!foundAnimal) throw new NotFoundException("Animal not found")
        
        return await this.animalRepo.recover(foundAnimal)
    }
}