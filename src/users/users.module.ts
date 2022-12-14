import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserRepository } from './users.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({defaultStrategy: 'jwt'})],
  controllers: [UsersController],
  providers: [UsersService, UserRepository]
})
export class UsersModule {}
