import { DatabaseModule } from '@cymulate/infrastructures/modules/database';
import { MailModule } from '@cymulate/infrastructures/modules/messaging';
import { Module } from '@nestjs/common';
import { MessagesService } from '.';

@Module({})
export class MessagesModule {
  static forRoot() {
    return {
      module: MessagesModule,
      imports: [MailModule.forRoot(), DatabaseModule.forRoot()],
      providers: [MessagesService],
      exports: [MessagesService],
    };
  }
}
