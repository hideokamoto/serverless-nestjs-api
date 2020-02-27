import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { launchSwagger } from './swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  const port = Number(process.env.PORT) || 3000;
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const logger = new Logger();
  app.useLogger(logger);

  launchSwagger(app);
  app.init();
  await app.listen(port);
}
bootstrap();
