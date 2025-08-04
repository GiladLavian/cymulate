import { PaginationDto } from '@cymulate/infrastructures/dtos';
import { CreateMessageDto } from '@cymulate/infrastructures/dtos/messaging';
import { MessagesService } from '@cymulate/infrastructures/repositories';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('findManyMessages')
  // @UseGuards(AuthGuard)
  findManyMessages(@Query() dto: PaginationDto) {
    return this.messagesService.findMany(dto);
  }

  @Post('createOneMessage')
  // @UseGuards(AuthGuard)
  createOneMessage(@Body() dto: CreateMessageDto) {
    return this.messagesService.createOne(dto);
  }
}
