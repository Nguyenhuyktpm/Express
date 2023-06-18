import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"
import { Ingredients } from "./Ingredients"


@Entity()
export class Recipes {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    title: string

    @Column({
        length: 100,
    })
    publisher: string

    @Column()
    publisherUrl:string

    @Column()
    imageUrl: string

    @Column()
    timetocook : number

    @Column()
    socialRank:number
}