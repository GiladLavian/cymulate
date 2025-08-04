import { ConfigModule } from '@cymulate/infrastructures/modules/config';
import { LoggerModule } from '@cymulate/infrastructures/modules/logger';
import { MessagesModule } from '@cymulate/infrastructures/repositories';
import { Module } from '@nestjs/common';
import { MessagingController } from './messaging.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ global: true }),
    LoggerModule.forRoot(),
    MessagesModule.forRoot(),
  ],
  controllers: [MessagingController],
  providers: [],
})
export class MessagingModule {}
