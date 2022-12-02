import { BadRequestException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { IException } from "./IExceptions";

export enum Exceptions {
  InvalidData,
  DataBaseException,
  NotFoundData,
  UnauthorizedException
}

export function HandleException({message, exception}: IException) {
  if (exception === Exceptions.InvalidData || exception === Exceptions.NotFoundData){
    throw new BadRequestException(message? message : "Invalid data");
  }
  if (exception === Exceptions.DataBaseException){
    throw new InternalServerErrorException("Error in database")
  }
  if (exception === Exceptions.UnauthorizedException){
    throw new UnauthorizedException(message? message: "You not have permissions to make action.")
  }
}
