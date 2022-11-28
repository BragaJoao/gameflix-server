import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { GamesController } from "./games.controller";
import { GameRepository } from "./games.repository";
import { GamesService } from "./games.service";

@Module({
  imports: [PrismaModule],
  controllers: [GamesController],
  providers: [GamesService, GameRepository]
})
export class GamesModule {}
