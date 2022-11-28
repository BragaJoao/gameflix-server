import { Injectable } from "@nestjs/common";

@Injectable()
export class GamesService{
  findAll() {
    return 'Search for all games.'
  }

  create() {
    return 'Create new game.'
  }
}
