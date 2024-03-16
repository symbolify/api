import { Module } from '@nestjs/common';
import { databaseProviders } from './db.providers';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    })
  ]
})
export class DbModule {}
