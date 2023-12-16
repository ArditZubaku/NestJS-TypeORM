import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pet } from '../../pet/entities/pet.entity';

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
