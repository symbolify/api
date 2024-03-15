import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

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
  async login(@Body() data: {email: string, password: string}, @Res({ passthrough: true }) response: Response) {
    try {
      const result = await this.userSrv.validate(data);
      if(result?.status && result.status === 'SUCCESS') {
        response.cookie('token', result.token);
        return result.name;
      }
    } catch(e) {
      throw e.message;
    }
  }
}
