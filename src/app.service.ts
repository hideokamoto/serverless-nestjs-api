import { Injectable } from '@nestjs/common';
import { LoggerService } from './share/logger/logger.service';

@Injectable()
export class AppService {
  constructor(private readonly log: LoggerService) {}
  getHello(username?: string): string {
    this.log.warn({
      username,
      test: true,
      number: 1,
    });
    return `Hello World! ${username}`;
  }
}
