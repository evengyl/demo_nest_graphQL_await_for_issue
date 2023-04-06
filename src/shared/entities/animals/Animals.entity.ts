import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { LifeTimeEntity } from "../LifeTime.entity"
import { CategoryAnimalsEntity } from "./CategoryAnimals.entity"

@Entity("animals")
export class AnimalsEntity extends LifeTimeEntity{

    @PrimaryGeneratedColumn()
    id : number

    @Column({length : 15, nullable : false, default : "N/C"})
    name : string

    @ManyToOne(() => CategoryAnimalsEntity, (categ) => categ.animals, { cascade : ["insert", "update"] })
    @JoinColumn()
    category : CategoryAnimalsEntity

    @Column({ length : 6, nullable : false, default : "N/C"})
    age : string

    @Column({ length : 25, nullable : false, default : "N/C"})
    cityFound : string
}