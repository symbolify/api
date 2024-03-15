import { Injectable, Inject, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { User } from './user.entity';
import { scryptSync, randomBytes } from 'crypto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
    private authSrv: AuthService
  ) {}

  async validate(data: {email: string, password: string}) {
    const output: {status: string, token?: string, data?: object, name?: string} = {
      status: 'FAILED'
    };
    try {
      const result = await this.userRepository.findOne({where: {email: data.email, status: true}});
      if(result && result.salt) {
        const getHash = scryptSync(data.password, result.salt, 32).toString("hex");
        if(getHash === result.password) {
          const token = this.authSrv.generateToken({email: data.email});
          if(token) {
            output.status = 'SUCCESS';
            output.token = token;
            output.data = {
              name: result.name
            };
            return output;
          }
        }
      }
    } catch(e) {
      throw new UnauthorizedException();
    }
    throw new UnauthorizedException();
  }

  async addNew(data: {email: string, password: string, name: string}) {
    const output = {
      status: 'FAILED',
      message: ''
    };
    try {
      const salt = randomBytes(16).toString("hex");
      const getHash = scryptSync(data.password, salt, 32).toString("hex");
      const response = await this.userRepository.findOrCreate({
        where: {email: data.email},
        defaults: {
          email: data.email,
          password: getHash,
          salt,
          name: data.name,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
      if(response && response.length > 1) {
        if(response[1] === true) {
          output.status = 'SUCCESS';
          output.message = 'User successfully created.';
        }
      }
    } catch(e) {
      throw new InternalServerErrorException();
    }
    return output;
  }
}