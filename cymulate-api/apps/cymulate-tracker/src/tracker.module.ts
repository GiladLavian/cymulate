import { ConfigModule } from '@cymulate/infrastructures/modules/config';
import { LoggerModule } from '@cymulate/infrastructures/modules/logger';
import { MessagesTrackerModule } from '@cymulate/infrastructures/repositories';
import { Module } from '@nestjs/common';
import { TrackerController } from './tracker.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ global: true }),
    LoggerModule.forRoot(),
    MessagesTrackerModule.forRoot(),
  ],
  controllers: [TrackerController],
  providers: [],
})
export class TrackerModule {}
