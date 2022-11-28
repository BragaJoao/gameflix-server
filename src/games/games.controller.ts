import { Controller, Get, Post } from "@nestjs/common";

@Controller('games')
export class GamesController {
  @Get()
  findAll(){
    return 'Search for all games.'
  }

  @Post()
  create(){
    return 'Create new game.'
  }

}
