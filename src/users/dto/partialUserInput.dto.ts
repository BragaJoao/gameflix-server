import { PartialType } from '@nestjs/swagger';
import { UserDto } from './userInput.dto';

export class PartialUserDto extends PartialType(UserDto) {
  id: string;
  role?: string;
}
