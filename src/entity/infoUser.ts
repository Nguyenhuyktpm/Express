import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm"
import { user } from "./user"


@Entity()
export class infoUser {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    name: string

    @Column({
    })
    phoneNumber: number

    @Column({
        length: 100,
    })
    email: string

    @OneToOne(()=>user)
    @JoinColumn()
    user: user

    

}