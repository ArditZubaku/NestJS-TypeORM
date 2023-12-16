import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetService {
  create(createPetDto: CreatePetDto) {
    return {
      ...createPetDto,
    };
  }

  findAll() {
    return `This action returns all pet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pet`;
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return {
      id,
      ...updatePetDto,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
