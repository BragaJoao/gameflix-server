import { CreateGenreDto } from "../dto/create-genre.dto";

export interface IGenreEntity extends CreateGenreDto{
  id: string,
}
