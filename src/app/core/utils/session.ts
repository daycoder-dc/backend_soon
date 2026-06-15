import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Session } from "./auth";

export interface RequestWithSession extends Request {
  session: Session;
}

export const GetSession = createParamDecorator<Session>((data:unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<RequestWithSession>();
  return request.session;
});
