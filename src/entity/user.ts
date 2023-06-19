import { Entity, Column, PrimaryGeneratedColumn} from "typeorm"


@Entity()
export class user {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    username: string

    @Column({
        length: 100,
    })
    password: string

    @Column({
        length: 10,
    })
    role: string
    
}