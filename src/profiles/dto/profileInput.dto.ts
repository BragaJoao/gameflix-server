import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ProfileDto {

  @ApiProperty({
    description: 'Profile name',
    example: 'Jones'
  })
  @IsString()
  title:     string;

  @ApiProperty({
    description: 'Profile"s image URL',
    example: 'https://avatars.githubusercontent.com/u/103535848?v=4'
  })
  @IsString()
  imageUrl:  string;

  @ApiProperty(
    {
      description: 'User"s ID wich is used to create a new profile',
      example: 'cb122b15-483c-4660-8734-fd320b6f788d'
    }
  )
  userId?:    string;

  @ApiProperty(
    {
      description: 'Game"s ID wich is used to conect with games',
      example: '0xc4fthn-wtc3-8752-9632-d8g2b6y8n1z5'
    }
  )
  gamesId?:   string[];
}
