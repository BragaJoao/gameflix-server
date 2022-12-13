import { ApiProperty } from "@nestjs/swagger";

export class CreateGenreDto {
  @ApiProperty({
    description: "Genre's name",
		example: "Action",
  })
  name: string;
}
