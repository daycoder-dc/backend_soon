import { auth } from "@/app/core/utils/auth";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BetterAuthService {
  private readonly auth = auth;

  public get api() {
    return this.auth.api;
  }
}
