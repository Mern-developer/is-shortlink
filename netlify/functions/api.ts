import serverlessExpress from '@codegenie/serverless-express';
import type { Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';

let cachedServer: Handler | undefined;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();

  return serverlessExpress({
    app: expressApp,
  });
}

export const handler: Handler = async (event, context, callback) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }

  return cachedServer(event, context, callback);
};