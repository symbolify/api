import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
// import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    AuthModule,
    TodoModule,
    UserModule,
    // DbModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [ConfigModule]
})
export class AppModule {}
