import { ExceptionModule } from '@/app/core/interceptor/exceptions.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { IEnvType } from './app/core/utils/env';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { NestFactory } from '@nestjs/core';
import compression from "compression";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
    bodyParser: false,
    autoFlushLogs: true,
    bufferLogs: true,
    rawBody: true
  });

  const logger = app.get(Logger);
  const config_service = app.get(ConfigService);
  const env = config_service.get<IEnvType["config"]>("config");

  if (!env) {
    logger.error("Enviroment not configurated");
    return 1;
  }

  app.set("trust proxy", 1);
  app.disable("x-powered-by");

  app.enableVersioning({
    type: VersioningType.URI
  });

  app.useLogger(logger);
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalFilters(new ExceptionModule());
  app.useBodyParser("urlencoded", { limit: "50mb", extended: true }),
  app.useBodyParser("json", { limit: "50mb" });
  app.use(compression({ level: 6, threshold: 1024 }));

  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: process.env.SERVER_ENV != "dev",
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  const document_builder = new DocumentBuilder()
    .setTitle("API Rest")
    .setDescription("Documentación")
    .setVersion("1.0")
    .addApiKey({ type: "apiKey", name: "X-API-KEY", in: "header" }, "API-Key")
    .build();

  const document_factory = SwaggerModule.createDocument(app, document_builder);

  SwaggerModule.setup("api/docs", app, document_factory, {
    customSiteTitle: "API Rest",
    jsonDocumentUrl: "swagger/json",
    useGlobalPrefix: true,
    swaggerOptions: {
      persistAuthorization: true
    }
  });

  await app.listen(env.server.port, env.server.host, () => {
    logger.log(`Server is running on http://${env.server.host}:${env.server.port}`);
  });
}

bootstrap();
