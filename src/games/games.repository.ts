import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GameDto } from "./dto/gameInput.dto";
import { PartialGameDto } from "./dto/partialGameInput.dto";
import { IGameEntity } from "./entities/game.entity";

@Injectable()

export class GameRepository {
  constructor(private readonly prisma: PrismaService){}

  async findAllGames():Promise<IGameEntity[]>{
    const allGames = await this.prisma.games.findMany();
    return allGames
  }

  async findOneGame(id: string):Promise<IGameEntity>{
    const foundGame = await this.prisma.games.findUniqueOrThrow({where: {id: id}});
    return foundGame
  }

  async createGame(game: IGameEntity): Promise<IGameEntity>{
    const CreatedGame = await this.prisma.games.create({ data: game});
    return CreatedGame
  }

  async updateGame(id:string, gameData: GameDto): Promise<IGameEntity>{
    const updatedGame = await this.prisma.games.update({
      where: {id: id},
      data: gameData,
    });
    return updatedGame
  }

 async deleteGame (id:string): Promise<IGameEntity>{
  const deletedGame = await this.prisma.games.delete({ where: {id: id}});
  return deletedGame
 }
}
