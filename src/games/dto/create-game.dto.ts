import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive, IsString } from "class-validator";

export class CreateGameDto {

  @ApiProperty({
    description: 'The title of the game',
    example: 'God of War Ragnarok'
  })
  @IsString()
  title: string;

  @IsString()
  @ApiProperty({
    description: 'Image Url to use for the game.',
    example: 'https://image.api.playstation.com/vulcan/ap/rnd/202109/2821/KkIiB8w4CBvZspu6zyzOza3p.png?w=440&thumb=false'
  })
  coverImageUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Description of the game.',
    example: 'Kratos will lead the armies of the other realms against Odin, Thor, and the army of Asgard. The armies include the Elves, the dead and the Vanir. The battle between Thor and Jörumungandr will still occur in which the God of Thunder will strike the World Serpent and sending Jörmungandr back in time.'
  })
  description: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Year of lauch of the respective game.',
    example: 2022
  })
  year: number;

  @IsPositive()
  @IsNumber()
  @ApiProperty({
    description: 'Imdb score from https://www.imdb.com',
    example: 9.8
  })
  imdbScore: number;

  @IsString()
  @ApiProperty({
    description: 'Link for the game trailer',
    example: 'https://www.youtube.com/watch?v=hfJ4Km46A-0'
  })
  trailerYouTubeUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Link for the gameplay' ,
    example: 'https://www.youtube.com/watch?v=ixllGOX0Evw'
  })
  gameplayYouTubeUrl: string;
}
