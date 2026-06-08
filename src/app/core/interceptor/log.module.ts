import { Request, Response } from "express";
import { LoggerModule } from "nestjs-pino";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        name: "API",
        autoLogging: true,
        transport: {
          target: "pino-pretty",
          options: {
            colorize: false,
            ignore: "pid,hostname",
            translateTime: "SYS:HH:MM:ss",
            singleLine: true
          }
        },
        serializers: {
          req(request:Request) {
            return `${request.method} - ${request.url}`;
          },
          res(response:Response) {
            return response.statusCode;
          }
        }
      }
    })
  ],
  exports: [
    LoggerModule
  ]
})
export class LogModule {}
