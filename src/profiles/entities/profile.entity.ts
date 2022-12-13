
import { IGameEntity } from "src/games/entities/game.entity";
import { IUserEntity } from "src/users/entities/user.entity";

export class Profiles {
  id: string;
  title: string;
  imageUrl: string;
  user?: IUserEntity;
  games?: IGameEntity[];
}
