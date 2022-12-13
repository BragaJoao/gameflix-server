import { PartialType } from '@nestjs/swagger';
import { ProfileDto } from './profileInput.dto';

export class PartialProfileDto extends PartialType(ProfileDto) {
  id: string;
}
