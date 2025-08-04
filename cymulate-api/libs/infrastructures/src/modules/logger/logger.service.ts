import { Injectable, Logger as NestLogger } from '@nestjs/common';

@Injectable()
export class Logger extends NestLogger {
  constructor(
    context?: string,
    options?: {
      timestamp?: boolean;
    },
  );
  constructor(context?: string);
  constructor();

  constructor(context = '', options?: { timestamp?: boolean }) {
    super(context, options);
  }
}
