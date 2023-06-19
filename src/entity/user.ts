import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Recipes } from "./Recipes";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true ,length:100})
  username: string

  @Column({
    length: 100,
  })
  password: string;

  @Column({
    length: 10,
  })
  role: string;

  
  @ManyToMany(() => Recipes, (recipe) => recipe.users)
  @JoinTable()
  recipes: Recipes[]
}
