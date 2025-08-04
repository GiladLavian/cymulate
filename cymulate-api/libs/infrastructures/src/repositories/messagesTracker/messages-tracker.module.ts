import { DatabaseModule } from '@cymulate/infrastructures/modules/database';
import { Module } from '@nestjs/common';
import { MessagesTrackerService } from '.';

@Module({})
export class MessagesTrackerModule {
  static forRoot() {
    return {
      module: MessagesTrackerModule,
      imports: [DatabaseModule.forRoot()],
      providers: [MessagesTrackerService],
      exports: [MessagesTrackerService],
    };
  }
}
