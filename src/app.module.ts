import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetModule } from './pet/pet.module';
import { UsersModule } from './users/users.module';
import { config } from './config/typeorm.config';
import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule, PetModule],
  controllers: [AppController],
})
export class AppModule {}
