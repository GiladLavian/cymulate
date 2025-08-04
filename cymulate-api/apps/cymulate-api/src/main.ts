import { Logger } from '@cymulate/infrastructures/modules/logger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(Logger);

  app.enableCors({
    origin: 'http://localhost:4001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // Set up global validation pipe
  // This will automatically validate incoming requests against DTOs
  // and transform them to the appropriate types
  // It also strips out properties that are not defined in the DTOs
  // to prevent over-posting attacks
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // Enable versioning for the API
  // This allows the API to handle different versions of endpoints
  // by using a version prefix in the URL (e.g., /v1/findManyUsers)
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });

  await app.listen(process.env.API_SERVER_PORT ?? 3000);

  logger.log(
    `Application is running on http://localhost:${process.env.API_SERVER_PORT ?? 3000}`,
  );
}

bootstrap();
