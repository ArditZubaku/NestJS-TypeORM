import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetModule } from './pet/pet.module';
import { UsersModule } from './users/users.module';
import { config } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule, PetModule],
})
export class AppModule {}
