import { DatabaseService } from '.';

export class DatabaseModule {
  static forRoot() {
    return {
      module: DatabaseModule,
      providers: [DatabaseService],
      exports: [DatabaseService],
    };
  }
}
