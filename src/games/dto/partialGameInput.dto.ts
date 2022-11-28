import { PartialType } from "@nestjs/swagger";
import { GameDto } from "./gameInput.dto";

export class PartialGameDto extends PartialType(GameDto){
  id: string
}
