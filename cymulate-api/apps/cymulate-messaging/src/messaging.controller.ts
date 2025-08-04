import { CreateMessageDto } from '@cymulate/infrastructures/dtos/messaging';
import { MessageEntity } from '@cymulate/infrastructures/entities';
import { MessagesService } from '@cymulate/infrastructures/repositories';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';

@Controller()
export class MessagingController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('sendPhishing')
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: MessageEntity })
  sendPhishing(@Body() dto: CreateMessageDto) {
    this.messagesService.createOne(dto);
  }
}
