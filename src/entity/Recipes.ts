import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
} from "typeorm";
import { Ingredients } from "./Ingredients";
import { User } from "./User";

@Entity()
export class Recipes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 100,
  })
  title: string;

  @Column({
    length: 100,
  })
  publisher: string;

  @Column()
  publisherUrl: string;

  @Column()
  imageUrl: string;

  @Column()
  timetocook: number;

  @Column()
  socialRank: number;

  @ManyToMany(() => User, (user) => user.recipes)
  users: User[];
}
