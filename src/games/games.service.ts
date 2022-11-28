import { Injectable } from "@nestjs/common";
import { CreateGameDto } from "./dto/create-game.dto";
import { Games } from "./entities/game.entity";

@Injectable()
export class GamesService{
  games: Games[] = [];

  findAll() {
    return 'Search for all games.'
  }

  create(createGameDto: CreateGameDto) {
    const game: Games = { id: 'um Id qualquer', ...createGameDto }

    this.games.push(game)

    return game
  }
}
