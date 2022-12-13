import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { UserDto } from './dto/userInput.dto';
import { PartialUserDto } from './dto/partialUserInput.dto';
import { IUserEntity } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { HandleException } from 'src/util/exceptions/exceptionsHelper';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() { cpf, email, password, name }: UserDto, @Res() response:Response) {
    try {
      const result = await this.usersService.create({
        cpf, email, password, name
      });

      response.status(201).send(result)
    } catch(err){
      HandleException(err)
    }
  }

  @Get()
  findAll(): Promise<IUserEntity[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') userId: string):Promise<IUserEntity>{
    try{
      return this.usersService.findOne(userId)
    } catch(err){
      console.log(err)
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() userData: UserDto):Promise<IUserEntity> {
    try{
      return await this.usersService.update(id, userData);
    }catch (err){
      HandleException(err)
    }
  }

  @Delete(':id')
  async remove(@Param('id') userId: string):Promise<string> {
    const userIsDeleted = await this.usersService.remove(userId);
    if (userIsDeleted) {
      return 'User deleted successfully';
    } else {
      return 'User not found';
    }
  }
}
