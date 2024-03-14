import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(private userSrv: UserService, private authSrv: AuthService) {}

  @Post('register')
  register(@Body() data: any) {
    try {
      return 'register';
    } catch(e) {
      throw e.message;
    }
  }

  @Post('login')
  login(@Body() data: any) {
    try {
      return this.authSrv.generateToken({email: data.email});
    } catch(e) {
      throw e.message;
    }
  }
}
