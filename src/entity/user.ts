import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class user {
  @PrimaryGeneratedColumn()
  id: number;

<<<<<<< HEAD
    @Column({ unique: true ,length:100})
    username: string
=======
  @Column({ unique: true, length: 100 })
  username: string;
>>>>>>> 862c50318094256f1b62728e48a6284f51e980b4

  @Column({
    length: 100,
  })
  password: string;

  @Column({
    length: 10,
  })
  role: string;
}
