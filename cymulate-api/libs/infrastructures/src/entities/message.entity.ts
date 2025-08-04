export class MessageEntity {
  constructor(partial: Partial<MessageEntity>) {
    Object.assign(this, partial);
  }
}
