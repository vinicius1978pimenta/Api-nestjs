import { Body, Controller, Get, Post } from '@nestjs/common';
import { SingInDto } from './dto/singin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice : AuthService){}


  @Post()
  SingIn(@Body() signInDto : SingInDto){
    return this.authservice.authenticate(signInDto)
  }

  @Get()
  Singout(){
    return this.authservice.signOut()
  }
}
