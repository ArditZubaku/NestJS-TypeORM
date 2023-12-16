import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { config } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule],
})
export class AppModule {}
