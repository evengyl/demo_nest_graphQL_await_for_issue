import { validate } from "class-validator";
import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { LifeTimeEntity } from "../LifeTime.entity"



@Entity("users")
export class UsersEntity extends LifeTimeEntity{
    
    @PrimaryGeneratedColumn()
    id : number

    @Column({ length : 50, nullable : false}) //attention que nullable est a false de base ! juste pour exemple
    name : string

    @Column({ unique : true, length : 15})
    pseudo : string

    @Column()
    password : string
}