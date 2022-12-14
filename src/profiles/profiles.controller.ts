import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfileDto } from './dto/profileInput.dto';
import { PartialProfileDto } from './dto/partialProfileInput.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HandleException } from 'src/util/exceptions/exceptionsHelper';
import { Profiles } from './entities/profile.entity';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('profiles')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  async create(@Body()  dto: ProfileDto):Promise<Profiles> {
    try {
      return await this.profilesService.create(dto);
    } catch (err){
      HandleException(err);
    }
  }

  @Get()
  async findAll():Promise<PartialProfileDto[]> {
    return await this.profilesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') profileId: string):Promise<PartialProfileDto> {
    try{
      return await this.profilesService.findOne(profileId);
    }catch(err){
      HandleException(err)
    }

  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() profileData: ProfileDto):Promise<PartialProfileDto> {
    try{
      return await this.profilesService.update(id, profileData);
    } catch(err) {
      HandleException (err)
    }
  }

  @Delete(':id')
  async remove(@Param('id') profileId: string):Promise<string> {
    const profileIsDeleted = await this.profilesService.remove(profileId)
    if (profileIsDeleted) {
      return 'Profile deleted successfully';
    } else {
      return 'Profile not found';
    }
  }
}
