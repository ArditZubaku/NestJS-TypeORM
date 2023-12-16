import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  create(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser: User = this.userRepository.create(createUserDTO);
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneByOrFail({
      id: id,
    });
  }

  async update(id: number, updateUserDTO: UpdateUserDTO): Promise<User> {
    // TODO: Test the update method
    const user: User = await this.findOne(id);
    return this.userRepository.save({ ...user, ...updateUserDTO });
  }

  async remove(id: number): Promise<User> {
    const user: User = await this.findOne(id);
    return this.userRepository.remove(user);
    // return this.userRepository.delete(id);
  }
}
