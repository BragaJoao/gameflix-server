import { BadRequestException, Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { GameDto } from "./dto/gameInput.dto";
import { IGameEntity } from "./entities/game.entity";
import { GamesService } from "./games.service";


@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(private readonly service: GamesService) {}

  @Get()
  async getAllGames(): Promise<IGameEntity[]>{
    return this.service.getAllGames();
  }

  @Get(':id')
  findOne(@Param('id') gameId: string): Promise<IGameEntity>{
    try {
      return this.service.getGameById(gameId)
    } catch(err){
      console.log(err)
    }
  }

  @Post()
  async createGame(@Body() {title, coverImageUrl, description, year, imdbScore, trailerYouTubeUrl, gameplayYouTubeUrl }: GameDto, @Res() response: Response){
    try {
      const result = await this.service.createGame({title, coverImageUrl, description, year, imdbScore, trailerYouTubeUrl, gameplayYouTubeUrl});

      response.status(201).send(result)
    } catch (err){
      console.log(err);
      throw new BadRequestException(err.message)
    }
  }

}
