import { ExceptionModule } from '@/app/core/interceptor/exceptions.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { IEnvType } from '@/app/core/env/env.type';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
    bodyParser: false,
    autoFlushLogs: true,
    bufferLogs: true,
    rawBody: true
  });

  const logger = app.get(Logger);
  const config = app.get(ConfigService<IEnvType>).get<IEnvType["config"]>("config")!;

  app.set("trust proxy", 1);
  app.disable("x-powered-by");

  app.enableVersioning({
    type: VersioningType.URI
  });

  app.useLogger(logger);
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalFilters(new ExceptionModule());

  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: process.env.SERVER_ENV != "dev",
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  await app.listen(config.server.port, config.server.host, () => {
    logger.log(`Server is running on http://${config.server.host}:${config.server.port}`);
  });
}

bootstrap();
