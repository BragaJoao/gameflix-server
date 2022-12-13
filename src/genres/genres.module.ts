import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GenreRepository } from './genres.repository';

@Module({
  imports: [PrismaModule],
  controllers: [GenresController],
  providers: [GenresService, GenreRepository]
})
export class GenresModule {}
