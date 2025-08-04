import { Injectable } from '@nestjs/common';
import { TemplateParamMap } from '..';
import { SendOptions } from '../interfaces';

@Injectable()
export abstract class BaseMessageService {
  abstract sendTemplate<T extends keyof TemplateParamMap>(
    template: T,
    params: TemplateParamMap[T],
  );

  abstract send(options: SendOptions): void;
}
