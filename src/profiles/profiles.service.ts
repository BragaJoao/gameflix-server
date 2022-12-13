import { Injectable } from '@nestjs/common';
import { ProfileDto } from './dto/profileInput.dto';
import { PartialProfileDto } from './dto/partialProfileInput.dto';
import { ProfileRepository } from './profiles.repository';
import { Profiles } from './entities/profile.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class ProfilesService {
constructor(private readonly profileRepository: ProfileRepository){}

  async create(dto: ProfileDto):Promise<Profiles> {
    const id = randomUUID()
    const createdProfile = await this.profileRepository.createProfile(dto, id)
    return  createdProfile
  }

  async findAll():Promise<PartialProfileDto[]> {
    return await this.profileRepository.findAllProfiles();
  }

  async findOne(profileId: string):Promise<PartialProfileDto> {
    const foundProfile = await this.profileRepository.findOneProfile(profileId)
    return foundProfile
  }

  async update(id: string, profileData: ProfileDto):Promise<Profiles>
  {
    const updatedProfile = await this.profileRepository.updateProfile(id, profileData)
    return
  }

  async remove(profileId: string):Promise<boolean> {
    try {
      await this.profileRepository.deleteProfile(profileId);
      return true;
    }catch(err) {
        return false
    }
  }
}
