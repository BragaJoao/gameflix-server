import { GameDto } from "../dto/gameInput.dto";

export interface IGameEntity extends GameDto{
  id: string,
}
