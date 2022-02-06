import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'users'
})
export class User {
  @PrimaryGeneratedColumn()
  @Generated("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}