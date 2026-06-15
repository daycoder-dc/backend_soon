import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { BetterAuthService } from "@/app/core/service/better-auth.service";
import { SignInDto, SingUpDto } from "./auth.dto";
import { isAPIError } from "better-auth/api";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor (private readonly auth:BetterAuthService) {}

  async signUp(dto: SingUpDto, headers: Record<string, string>, res: Response) {
    try {
      const ctx = await this.auth.api.signUpEmail({
        returnHeaders: true,
        returnStatus: true,
        headers,
        body: {
          name: dto.name,
          email: dto.email,
          password: dto.password,
          image: dto.image,
        }
      });

      res.setHeaders(ctx.headers);

      return ctx.response;
    }
    catch (err) {
      if (isAPIError(err)) {
        throw new HttpException(err.message, err.statusCode, {
          cause: err.cause
        });
      }

      throw new InternalServerErrorException(err?.toString());
    }
  }

  async signIn(dto: SignInDto, headers: Record<string, string>, res: Response) {
    try {
      const ctx = await this.auth.api.signInEmail({
        returnHeaders: true,
        returnStatus: true,
        headers,
        body: {
          email: dto.email,
          password: dto.password,
          rememberMe: dto.remenberMe
        }
      });

      res.setHeaders(ctx.headers);

      return ctx.response
    }
    catch (err) {
      if (isAPIError(err)) {
        throw new HttpException(err.message, err.statusCode, {
          cause: err.cause
        });
      }

      throw new InternalServerErrorException(err?.toString());
    }
  }

  async signOut(headers: Record<string, string>, res: Response) {
    try {
      const ctx = await this.auth.api.signOut({
        returnHeaders: true,
        returnStatus: true,
        headers
      });

      res.setHeaders(ctx.headers);

      return ctx.response;
    }
    catch (err) {
      if (isAPIError(err)) {
        throw new HttpException(err.message, err.statusCode, {
          cause: err.cause
        });
      }

      throw new InternalServerErrorException(err?.toString());
    }
  }
}
