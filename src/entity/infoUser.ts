import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class infoUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column({})
  phoneNumber: number;

  @Column({
    length: 100,
  })
  email: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
