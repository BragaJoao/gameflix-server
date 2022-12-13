import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProfileRepository } from './profiles.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ProfilesController],
  providers: [ProfilesService, ProfileRepository]
})
export class ProfilesModule {}
