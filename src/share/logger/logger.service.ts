import { Injectable, LoggerService as Service, Optional } from '@nestjs/common';
import * as bunyan from 'bunyan'
import * as bunyanFormat from 'bunyan-format'
import { APIGatewayProxyEvent } from 'aws-lambda';

/**
 * Default configuration
 **/
const defaultOptions: Partial<bunyan.LoggerOptions> = {
    level: 'debug',
    stream: new bunyanFormat({
      outputMode: 'bunyan',
      levelInString: true
    }),
  }
  
  /**
   * Create logger
   **/
  const createBunyanLogger = (opts?: bunyan.LoggerOptions): bunyan => {
    const logger = bunyan.createLogger({
      ...defaultOptions,
      ...opts
    })
    return logger
  }

const createLoggingContextFromEvent = (event?: APIGatewayProxyEvent): {[key: string]: any} => {
    if (!event || !event.requestContext) return null;
    const {
        requestId,
        requestTimeEpoch,
        httpMethod,
        path,
        stage,
        domainName,
        resourcePath,
    } = event.requestContext
    return {
        requestId,
        requestTimeEpoch,
        httpMethod,
        path,
        stage,
        domainName,
        resourcePath,
    }
}

let logger: bunyan
export class LoggerFactory {
    logger: bunyan
    public init(event?: APIGatewayProxyEvent) {
        logger = createBunyanLogger({
            name: 'AMIMOTO API',
            ...createLoggingContextFromEvent(event)
        })
        return this
    }
    public getLogger(): bunyan {
        if (!logger) return this.init().getLogger()
        return logger
    }
}

export const Logger = new LoggerFactory()

@Injectable()
export class LoggerService implements Service {
    private logger: bunyan = Logger.getLogger()
    updateLogger(logger: bunyan) {
        this.logger = logger
    }

    public log(message: any, context?: string) {
        this.logger.info(message, context)
    }
    public error(message: any, trace?: string, context?: string) {
        this.logger.error(message, context, trace)
    }
    public warn(message: any, context?: string) {
        this.logger.warn(message, context)
    }
    public debug(message: any, context?: string) {
        this.logger.debug(message, context)
    }

}
