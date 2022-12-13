import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { IGenreEntity } from './entities/genre.entity';
import { GenreRepository } from './genres.repository';

@Injectable()
export class GenresService {
  constructor(private readonly genreRepository: GenreRepository){}

  async create(genre: CreateGenreDto):Promise<IGenreEntity> {
    const genreEntity = {...genre, id: randomUUID()}
    const createdGenre = await this.genreRepository.CreateGenre(genreEntity)
    return  createdGenre
  }

  async findAll():Promise<IGenreEntity[]> {
    return await this.genreRepository.findAllGenres()
  }

  async findOne(genreId: string):Promise<IGenreEntity> {
    const foundGenre = this.genreRepository.findOneGenre(genreId)
    return foundGenre
  }

  async update(id: string, genreData: CreateGenreDto):Promise<IGenreEntity> {
    const updatedGenre = await this.genreRepository.UpdateGenre(id, genreData )
    return updatedGenre
  }

  async remove(id: string):Promise<boolean> {
    try{
      await this.genreRepository.DeleteGenres(id)
      return true
    } catch {
      return false
    }

  }
}
