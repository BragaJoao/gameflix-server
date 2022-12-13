import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/userInput.dto';
import { PartialUserDto } from './dto/partialUserInput.dto';
import { IUserEntity } from './entities/user.entity';
import { UserRepository } from './users.repository';
import { randomUUID } from 'crypto';
import { Exception } from 'src/util/exceptions/exception';
import { Exceptions } from 'src/util/exceptions/exceptionsHelper';
import { hash} from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository:UserRepository){}

  async create(user: UserDto ): Promise<IUserEntity> {
    const userEntity = {...user, id:randomUUID(), role: 'user'};
    if (user.password.length <= 7) {
      throw new Exception(
        Exceptions.InvalidData,
        'Password must have at least 7 characters',
      );
    }
    const hashedPassword = await hash(user.password, 10);
    userEntity.password = hashedPassword;

    const createdUser = await this.userRepository.createUser(userEntity)
    delete createdUser.password
    return createdUser;
  }

  async getAllUsers():Promise<IUserEntity[]> {
    return await this.userRepository.findAllUsers();
  }

  async findOne(gameId: string):Promise<IUserEntity> {
    const foundUser = await this.userRepository.findOneUser(gameId);
    return foundUser;
  }

  async update(id: string, userData: UserDto ):Promise<IUserEntity> {
    const updatedUser = await this.userRepository.updateUser(id, userData)
    return updatedUser;
  }

  async remove(userId: string):Promise<boolean> {
    try {
      await this.userRepository.deleteUser(userId);
      return true
    } catch(err){
      return false
    }
  }
}
