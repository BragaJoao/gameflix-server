import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [GamesModule, PrismaModule, UsersModule, ProfilesModule, GenresModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
