import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne} from "typeorm"
import { Recipes } from "./Recipes"
@Entity()
export class ingredients {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(()=>Recipes)
    @JoinColumn()
    id_recip: Recipes

    @Column({
        length: 100,
    })
    name: string

    @Column({
        length: 100,
    })
    ingredients1: string

    @Column({
        length: 100,
    })
    ingredients2: string

    @Column({
        length: 100,
    })
    ingredients3: string

    @Column({
        length: 100,
    })
    ingredients4: string

    @Column({
        length: 100,
    })
    ingredients5: string

    @Column({
        length: 100,
    })
    ingredients6: string
    
}