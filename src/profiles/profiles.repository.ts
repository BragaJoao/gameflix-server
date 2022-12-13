import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { title } from "process";
import { PrismaService } from "src/prisma/prisma.service";
import { Exception } from "src/util/exceptions/exception";
import { Exceptions } from "src/util/exceptions/exceptionsHelper";
import { PartialProfileDto } from "./dto/partialProfileInput.dto";
import { ProfileDto } from "./dto/profileInput.dto";
import { Profiles } from "./entities/profile.entity";

@Injectable()
export class ProfileRepository{
  constructor (private readonly prisma: PrismaService){}

  async findAllProfiles():Promise<PartialProfileDto[]>{
    const allProfiles = await this.prisma.profile.findMany({
      select: {
        id: true,
        title: true,
        imageUrl: true,
        user : {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    })
    return allProfiles
  }

  async findOneProfile(id: string):Promise<PartialProfileDto>{
    try{
      const foundProfile = await this.prisma.profile.findUniqueOrThrow({
        where: {id: id},
        select: {
          id: true,
          title: true,
          imageUrl: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        }
      })
      return foundProfile
    }catch(err){
      throw new Exception(Exceptions.DataBaseException);
    }

  }

  async createProfile(createProfileDto:ProfileDto, id:string):Promise<Profiles>{
    const data: Prisma.ProfileCreateInput = {
      id,
      title: createProfileDto.title,
      imageUrl: createProfileDto.imageUrl,
      user: {
        connect: {
          id: createProfileDto.userId,
        }
      }
    }
    return await this.prisma.profile.create({data})
  }

  async updateProfile(id:string, profileData: ProfileDto):Promise<Profiles>{
    try {
      const updatedProfile = await this.prisma.profile.update({
        where: {id: id},
        data: profileData,
      });
      return updatedProfile
    } catch {
      throw new Exception(Exceptions.DataBaseException);
    }

  }

  async deleteProfile(id: string):Promise<Profiles>{
    const deletedProfile = await this.prisma.profile.delete({ where: {id: id}});
    return deletedProfile
  }
}
