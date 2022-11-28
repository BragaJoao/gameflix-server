import { Injectable } from "@nestjs/common";
import { CreateGameDto } from "./dto/create-game.dto";

@Injectable()
export class GamesService{
  findAll() {
    return 'Search for all games.'
  }

  create(createGameDto: CreateGameDto) {
    return 'Create new game.' + JSON.stringify(createGameDto)
  }
}
