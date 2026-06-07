import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { ExceptionModule } from './config/exceptions.module';
import { IEnvConfg } from './config/env.module';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
    autoFlushLogs: true,
    bufferLogs: true,
    rawBody: false
  });

  const logger = app.get(Logger);
  const config = app.get(ConfigService<IEnvConfg>).get<IEnvConfg["config"]>("config")!;

  app.set("trust proxy", 1);
  app.useLogger(logger);
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalFilters(new ExceptionModule());
  app.disable("x-powered-by");

  await app.listen(config.server.port, config.server.host, () => {
    logger.log(`Server is running on http://${config.server.host}:${config.server.port}`);
  });
}

bootstrap();
