import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateGenreDto } from "./dto/create-genre.dto";
import { IGenreEntity } from "./entities/genre.entity";

@Injectable()
export class GenreRepository {
  constructor (private readonly prisma: PrismaService){}

  async findAllGenres():Promise<IGenreEntity[]>{
    const allGenres = await this.prisma.genre.findMany()
    return allGenres
  }

  async findOneGenre(id: string):Promise<IGenreEntity>{
    const foundGenre = await this.prisma.genre.findUniqueOrThrow({
      where: {id: id},
      include:{
        game: true
      }
    })
    return foundGenre
  }

  async CreateGenre(genre: IGenreEntity):Promise<IGenreEntity>{
    const createdGenre = await this.prisma.genre.create({data: genre})
    return createdGenre
  }

  async UpdateGenre(id: string, genreData:CreateGenreDto):Promise<IGenreEntity>{
    const updatedGenre = await this.prisma.genre.update({
      where: {id: id},
      data: genreData,
    })
    return updatedGenre
  }

  async DeleteGenres(id:string):Promise<IGenreEntity>{
    const deletedGenre = await this.prisma.genre.delete({ where: {id: id}})
    return deletedGenre
  }
}
