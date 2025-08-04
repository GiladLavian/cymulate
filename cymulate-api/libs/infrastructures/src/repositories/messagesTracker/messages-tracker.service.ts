import { PaginationDto } from '@cymulate/infrastructures/dtos';
import { CreateMessageTrackerDto } from '@cymulate/infrastructures/dtos/messaging';
import { MessageTrackerEntity } from '@cymulate/infrastructures/entities';
import { DatabaseService } from '@cymulate/infrastructures/modules/database';
import { Logger } from '@cymulate/infrastructures/modules/logger';
import { Injectable } from '@nestjs/common';

interface CreateoneOptions {
  ipAddress: string;
}

@Injectable()
export class MessagesTrackerService {
  _logger = new Logger(MessagesTrackerService.name);

  constructor(private readonly database: DatabaseService) {}

  async createOne(
    query: CreateMessageTrackerDto,
    options: CreateoneOptions,
  ): Promise<boolean> {
    const results = await this.database.messagesTracker.create({
      data: {
        messageId: query.id,
        ipAddress: options.ipAddress,
      },
    });

    return results.id ? true : false;
  }

  findMany(dto: PaginationDto): Promise<MessageTrackerEntity[]> {
    return this.database.messagesTracker.findMany({
      take: dto.take,
      skip: dto.skip,

      ...(dto.orderByField && {
        orderBy: {
          [dto.orderByField]: dto.orderByDirection || 'asc',
        },
      }),
    });
  }
}
