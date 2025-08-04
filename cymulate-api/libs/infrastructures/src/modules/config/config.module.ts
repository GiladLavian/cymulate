import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from '.';

interface ModuleOptions {
  global?: boolean;
}

@Module({})
export class ConfigModule {
  static forRoot(props?: ModuleOptions): DynamicModule {
    return {
      module: ConfigModule,
      global: props?.global,
      imports: [
        NestConfigModule.forRoot({
          envFilePath: [`./envs/.env.${process.env.NODE_ENV}`, '.env'],
        }),
      ],
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}
