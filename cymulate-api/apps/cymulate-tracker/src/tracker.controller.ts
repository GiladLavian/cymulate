import { CreateMessageTrackerDto } from '@cymulate/infrastructures/dtos/messaging';
import { MessagesTrackerService } from '@cymulate/infrastructures/repositories';
import { Controller, Get, Ip, Query } from '@nestjs/common';

@Controller()
export class TrackerController {
  constructor(
    private readonly messagesTrackerService: MessagesTrackerService,
  ) {}

  @Get('welcome')
  async welcome(@Query() query: CreateMessageTrackerDto, @Ip() ip: string) {
    try {
      await this.messagesTrackerService.createOne(query, {
        ipAddress: ip,
      });
    } catch {
      // Handle error (e.g., log it, return a specific error response, etc.)
    }

    return 'Welcome ! We got your request and will process it shortly.';
  }
}
