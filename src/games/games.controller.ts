import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateGameDto } from "./dto/create-game.dto";
import { GamesService } from "./games.service";

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  findAll(){
    return this.gamesService.findAll();

  }

  @Post()
  create(@Body() createGameDto: CreateGameDto){
    return this.gamesService.create(createGameDto);
  }

}
