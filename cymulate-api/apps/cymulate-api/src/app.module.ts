import { ConfigModule } from '@cymulate/infrastructures/modules/config';
import { LoggerModule } from '@cymulate/infrastructures/modules/logger';
import {
  MessagesModule,
  UsersModule,
} from '@cymulate/infrastructures/repositories';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ global: true }),
    LoggerModule.forRoot(),
    AuthModule.forRoot(),
    UsersModule.forRoot(),
    MessagesModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
