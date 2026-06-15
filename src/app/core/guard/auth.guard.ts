import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { BetterAuthService } from "@/app/core/service/better-auth.service";
import { IS_PUBLIC_KEY } from "@/app/core/utils/public";
import { RequestWithSession } from "../utils/session";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly auth: BetterAuthService
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithSession>();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) {
      return true;
    }

    const headers = new Headers();
    Object.entries(request.headers).forEach(([k,v]) => {
      if (Array.isArray(v)) {
        v.forEach((a) => headers.append(k,a));
      }
      else if (v) {
        headers.append(k, v);
      }
    });

    const session = await this.auth.api.getSession({
      headers: headers
    });

    if (!session) {
      return false;
    }

    request.session = session;

    return true;
  }
}
