import { PaginationDto } from '@cymulate/infrastructures/dtos';
import { CreateMessageDto } from '@cymulate/infrastructures/dtos/messaging';
import { MessageEntity } from '@cymulate/infrastructures/entities';
import { MessageStatus, MessageType } from '@cymulate/infrastructures/enums';
import { DatabaseService } from '@cymulate/infrastructures/modules/database';
import { Logger } from '@cymulate/infrastructures/modules/logger';
import { MailService } from '@cymulate/infrastructures/modules/messaging';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  _logger = new Logger(MessagesService.name);

  constructor(
    private readonly database: DatabaseService,
    private readonly mailService: MailService,
  ) {}

  async createOne(dto: CreateMessageDto): Promise<MessageEntity> {
    const results = await this.database.messages.create({
      data: {
        sender: dto.sender || 'gilad.l@yonalink.com',
        recipient: dto.recipient,
        subject: dto.subject || '',
        body: dto.body || '',
        messageType: MessageType.Email,
        status: MessageStatus.Pending,
      },
    });

    try {
      const response = await this.mailService.sendTemplate('Welcome', {
        to: results.recipient,
        from: results.sender,
        subject: results.subject,
        context: {
          messageId: results.id,
          link: `http://localhost:4011/v1/welcome?id=${results.id}`,
        },
      });

      // Update message status to Sent if email was accepted
      if (response.accepted.length) {
        await this.database.messages.update({
          where: { id: results.id },
          data: {
            status: MessageStatus.Sent,
          },
        });
      }
    } catch (error) {
      this._logger.error('Failed to send email', error);

      // Update message status to Error if email sending failed
      // This is important to handle the error gracefully and not leave the message in Pending state
      await this.database.messages.update({
        where: { id: results.id },
        data: {
          status: MessageStatus.Error,
        },
      });
    }

    return results;
  }

  findMany(dto: PaginationDto): Promise<MessageEntity[]> {
    return this.database.messages.findMany({
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
