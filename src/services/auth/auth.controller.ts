import { Controller, Get, Post, Body, UseGuards, Inject, Patch } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './auth.guard';
import { AUTH_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { Token } from './decorator/token.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authClient.send({ cmd: 'auth.register' }, registerUserDto)
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authClient.send({ cmd: 'auth.login' }, loginUserDto)
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Token() token: string) {
    return this.authClient.send({ cmd: 'auth.profile' }, token)
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      );
  }

  @UseGuards(AuthGuard)
  @Patch('update')
  update(@Token() token: string, @Body() updateUserDto: UpdateUserDto) {

    return this.authClient.send({ cmd: 'auth.update.user' }, { token, ...updateUserDto })
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      ) 
  }
}
