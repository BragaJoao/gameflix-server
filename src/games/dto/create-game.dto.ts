import { IsNumber, IsPositive, IsString } from "class-validator";

export class CreateGameDto {
  @IsString()
  title: string;

  @IsString()
  coverImageUrl: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  year: number;

  @IsPositive()
  @IsNumber()
  imdbScore: number;

  @IsString()
  trailerYouTubeUrl: string;

  @IsString()
  gameplayYouTubeUrl: string;
}
