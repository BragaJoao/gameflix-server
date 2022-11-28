import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { GameDto } from "./dto/gameInput.dto";
import { IGameEntity } from "./entities/game.entity";
import { GameRepository } from "./games.repository";


@Injectable()
export class GamesService{
  constructor(private  readonly gameRepository: GameRepository){}

  async getAllGames(): Promise<IGameEntity[]> {
    return await this.gameRepository.findAllGames();
  }

  async getGameById(gameId: string): Promise<IGameEntity> {
    const foundGame = await this.gameRepository.findOneGame(gameId)
    return foundGame;
  }

  async createGame(game: GameDto): Promise<IGameEntity> {
    const gameEntity = { ...game, id: randomUUID() }
    const createdGame = await this.gameRepository.createGame(gameEntity)
    return createdGame;
  }
}
