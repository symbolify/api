import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.gaurd';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    AuthService,
    AuthGuard,
    JwtService
  ],
  exports: [
    AuthService
  ],
  imports: [
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET_KEY}`,
      signOptions: { expiresIn: '1h' },
    }),
  ]
})
export class AuthModule {
  constructor() {
    console.log('##### ', process.env.JWT_SECRET_KEY);
  }
}
