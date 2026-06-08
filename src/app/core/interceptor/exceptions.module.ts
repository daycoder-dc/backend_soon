import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class ExceptionModule implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    response.status(exception.getStatus()).json({
      message: exception?.message,
      response: exception?.getResponse(),
      cause: exception?.cause
    });
  }
}
