import { Module } from '@nestjs/common';
import { DatabaseModule } from '@cymulate/infrastructures/modules/database';
import { UsersService } from '.';

@Module({})
export class UsersModule {
  static forRoot() {
    return {
      module: UsersModule,
      imports: [DatabaseModule.forRoot()],
      providers: [UsersService],
      exports: [UsersService],
    };
  }
}
