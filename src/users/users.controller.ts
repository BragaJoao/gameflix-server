import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { UserDto } from './dto/userInput.dto';
import { PartialUserDto } from './dto/partialUserInput.dto';
import { IUserEntity } from './entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HandleException } from 'src/util/exceptions/exceptionsHelper';
import { AuthGuard } from '@nestjs/passport';

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
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findAll(): Promise<IUserEntity[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findOne(@Param('id') userId: string):Promise<IUserEntity>{
    try{
      return this.usersService.findOne(userId)
    } catch(err){
      console.log(err)
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() userData: UserDto):Promise<IUserEntity> {
    try{
      return await this.usersService.update(id, userData);
    }catch (err){
      HandleException(err)
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async remove(@Param('id') userId: string):Promise<string> {
    const userIsDeleted = await this.usersService.remove(userId);
    if (userIsDeleted) {
      return 'User deleted successfully';
    } else {
      return 'User not found';
    }
  }
}
