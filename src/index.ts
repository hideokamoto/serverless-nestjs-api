import { APIGatewayProxyHandler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as serverless from 'aws-serverless-express';
import * as express from 'express';
import { Logger as Log } from './share/logger/logger.service';

let cachedServer: Server;

const bootstrapServer = async (): Promise<Server> => {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);
  app.enableCors();
  app.init();
  return serverless.createServer(expressApp);
};

export const handler: APIGatewayProxyHandler = async (event, context) => {
  Log.init(event);
  const logger = Log.getLogger();
  logger.info(event);
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  const result = await serverless.proxy(cachedServer, event, context, 'PROMISE')
    .promise;
  logger.info(result);
  return result;
};
