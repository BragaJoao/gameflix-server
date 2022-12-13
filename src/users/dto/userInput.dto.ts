import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class UserDto {

  @ApiProperty({
    description: 'Users email',
    example: 'fulano@mail.com'
  })
  @IsString()
  email: string

  @ApiProperty({
    description: 'Users password',
    example: '123*Abcd'
  })
  @IsString()
  password: string

  @ApiProperty({
    description: 'Users name',
    example: 'Fulano da Silva'
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'Users CPF',
    example: '12345678912'
  })
  @IsString()
  cpf: string

}
