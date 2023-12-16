import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// User table
@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'integer',
  })
  id: number;

  @Column()
  name: string;

  @Column()
  test: string;

  @Column()
  test2: string;
}
