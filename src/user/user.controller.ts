import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private userSrv: UserService,
    ) {}

  @Post('register')
  async register(@Body() data: {email: string, password: string, name: string}) {
    try {
      return await this.userSrv.addNew(data);
    } catch(e) {
      throw e.message;
    }
  }

  @Post('login')
  async login(@Body() data: {email: string, password: string}) {
    try {
      return await this.userSrv.validate(data);
      // 
    } catch(e) {
      throw e.message;
    }
  }
}
