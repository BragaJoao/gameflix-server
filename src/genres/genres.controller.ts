import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Response, response } from 'express';
import { HandleException } from 'src/util/exceptions/exceptionsHelper';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
create(@Body() { name }: CreateGenreDto, @Res() response: Response) {
  try{
    const result =  this.genresService.create({ name });

    response.status(201).send(result)
  } catch(err) {
    HandleException(err)
  }

  }

  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') genreId: string) {
    try{
      return this.genresService.findOne(genreId);
    } catch(err) {
      console.log(err)
      HandleException(err)
    }

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() genreData: CreateGenreDto) {
    return this.genresService.update(id, genreData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genresService.remove(id);
  }
}
