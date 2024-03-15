import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { userProviders } from './user.providers';

@Module({
  controllers: [UserController],
  providers: [
    AuthService,
    UserService,
    ...userProviders
  ],
  imports: [AuthModule]
})
export class UserModule {}
