import { Logger } from '.';

export class LoggerModule {
  static forRoot() {
    return {
      module: LoggerModule,
      providers: [Logger],
      exports: [Logger],
    };
  }
}
