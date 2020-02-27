import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const launchSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Serverless Nestjs API')
    .setDescription('The Serverless Nestjs API documents.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
};
