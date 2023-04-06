import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { AnimalsEntity } from "./Animals.entity"

@Entity("category_animals")
export class CategoryAnimalsEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id : number

    @Column({length : 15, nullable : false, default : "N/C", unique : true})
    name : string

    @Column({ length : 6, nullable : false, default : "0-10"})
    rangeAge : string

    @OneToMany(() => AnimalsEntity, (animal) => animal.category, { cascade : ["insert", "update"]})
    @JoinColumn()
    animals : AnimalsEntity[]
}