import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@cymulate/database';
import { Logger } from '../logger';

@Injectable()
export class DatabaseService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query'>
  implements OnModuleInit, OnModuleDestroy
{
  _logger = new Logger(DatabaseService.name);

  constructor() {
    super({
      // errorFormat: 'minimal',
      log: [
        // {
        //   emit: 'event',
        //   level: 'query',
        // },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
    });

    this.$on('query', (e) => {
      const { query, ...rest } = e;
      this._logger.debug(query, rest);
    });
  }

  async onModuleInit() {
    try {
      this._logger.debug('Database: Try to connect');
      await this.$connect();
      this._logger.debug('Database: connected');
    } catch (e) {
      this._logger.fatal(`Database: failed to connect ${e}`);
    }
  }

  async onModuleDestroy() {
    try {
      this._logger.debug('Database: Try to disconnected');
      await this.$disconnect();
      this._logger.debug('Database: disconnected');
    } catch (e) {
      this._logger.fatal(`Database: failed to disconnect ${e}`);
    }
  }
}
