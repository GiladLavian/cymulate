import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { Module } from '@nestjs/common';
import { MailService } from '.';
import { ConfigModule, ConfigService } from '../../config';

@Module({})
export class MailModule {
  static forRoot() {
    return {
      module: MailModule,
      imports: [
        ConfigModule.forRoot({ global: true }),
        MailerModule.forRootAsync({
          useFactory: (config: ConfigService) => {
            return {
              transport: {
                host: config.get<string>('SMTP_HOST'),
                port: config.get<number>('SMTP_PORT'),
                auth: {
                  user: config.get<string>('SMTP_USER'),
                  pass: config.get<string>('SMTP_PASSWORD'),
                },
                secure: false, // true for 465, false for other ports
              },
              defaults: {
                from: config.get<string>('SMTP_FROM'),
              },
              template: {
                dir: 'templates',
                adapter: new PugAdapter(),
                options: {
                  strict: true,
                },
              },
            };
          },
          inject: [ConfigService],
        }),
      ],
      providers: [MailService],
      exports: [MailService],
    };
  }
}
