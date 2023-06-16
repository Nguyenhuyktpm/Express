import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"

export class Recipes {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    name: string



    
}