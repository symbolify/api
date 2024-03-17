import { Body, Controller, Post, Res, UnauthorizedException } from '@nestjs/common';
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
    const output: {status: string, message?: string, data?: any} = {
      status: 'FAILED'
    };
    try {
      const result = await this.userSrv.validate(data);
      if(result?.status && result.status === 'SUCCESS') {
        response.cookie('token', result.token, {httpOnly: true});
        output.status = 'SUCCESS';
        output.data = result.data;
        return output;
      }
    } catch(e) {
      console.error(e);
    }
    output.message = 'Invalid credential !'
    return output;
  }
}
