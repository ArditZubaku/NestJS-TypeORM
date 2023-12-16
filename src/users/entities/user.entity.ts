import { Pet } from 'src/pet/entities/pet.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// User table
@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'integer',
  })
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Pet, (pet) => pet.owner)
  pets: Pet[];

  @Column()
  test: string;
}
