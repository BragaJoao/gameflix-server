import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { HandleException } from "src/util/exceptions/exceptionsHelper";
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
      HandleException(err)
    }
  }

  @Patch(':id')
  async updateGame(@Param('id') id: string, @Body() gameData: GameDto): Promise<IGameEntity>{
    try{
      return await this.service.updateGame(id, gameData)
    }catch(err){
      HandleException(err);
    }
  }

  @Delete(':id')
  async deleGameById(@Param('id') gameId: string): Promise<string>{
    const gameIsDeleted = await  this.service.deleteGameById(gameId);
    console.log(gameIsDeleted);
    if (gameIsDeleted) {
      return 'Game deleted successfully';
    } else {
      return 'Game not found';
    }
  }

}
