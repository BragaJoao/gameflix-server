import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Exception } from "src/util/exceptions/exception";
import { Exceptions } from "src/util/exceptions/exceptionsHelper";
import { UserDto } from "./dto/userInput.dto";
import { IUserEntity } from "./entities/user.entity";

@Injectable()
export class UserRepository{
  constructor(private readonly prisma: PrismaService){}

  async findAllUsers():Promise<IUserEntity[]>{
    const allUsers = await this.prisma.user.findMany();
    return allUsers
  }

  async findOneUser(id: string):Promise<IUserEntity>{
    const foundUser = await this.prisma.user.findUniqueOrThrow({where: {id: id}});
    return foundUser
  }

  async createUser(user: IUserEntity):Promise<IUserEntity>{
    try{
      const createdUser = await this.prisma.user.create({ data: user})
      return createdUser
    } catch(err){
      throw new Exception(
        Exceptions.DataBaseException,
        'Erro ao criar usuário cpf ou email ja cadastrados',
      );
    }
  }

  async updateUser (id:string, userData: UserDto):Promise<IUserEntity>{
    try{
      const updateUser = await this.prisma.user.update({
        where: {id: id},
        data: userData,
      });
      return updateUser
    } catch(err){
      throw new Exception(Exceptions.DataBaseException);
    }
  }

  async deleteUser(id:string):Promise<IUserEntity>{
    const deletedUser = await this.prisma.user.delete({ where: {id: id}});
    return deletedUser
  }
}
