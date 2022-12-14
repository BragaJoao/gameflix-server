import { Body, Controller, HttpCode, HttpStatus, Post, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags  } from '@nestjs/swagger';
import { IUserEntity } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { LoggedUser } from './logged-user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto):Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Returns authenticated user'
  })
  @ApiBearerAuth()
  profile(@LoggedUser() user: IUserEntity){
    return user
  }
}
