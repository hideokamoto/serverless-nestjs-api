import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const launchSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('AMIMOTO Dashboard API')
    .setDescription('The AMIMOTO Managed hosting API documents.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
};

