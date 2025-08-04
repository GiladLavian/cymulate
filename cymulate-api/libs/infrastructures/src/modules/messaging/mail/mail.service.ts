import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Logger } from '../../logger';
import { BaseMessageService } from '../base';
import { SendOptions } from '../interfaces';

export type TemplateParamMap = {
  Test: {} & SendOptions;
  Welcome: {} & SendOptions;
  Notification: SendOptions;
};

@Injectable()
export class MailService extends BaseMessageService {
  _logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {
    super();
  }

  async sendTemplate<T extends keyof TemplateParamMap>(
    template: T,
    params: TemplateParamMap[T],
  ) {
    const response = await this.mailerService.sendMail({
      to: params.to, // Assuming 'name' is an email address for simplicity
      from: params.from,
      subject: params.subject,
      template: template,
      context: params.context || {}, // Pass context if available
    });

    this._logger.debug(`Email sent with template ${template}`, {
      to: params.to,
      subject: params.subject,
    });

    return response;
  }

  send(options: SendOptions) {
    console.log('Sending email...', options);
  }
}
