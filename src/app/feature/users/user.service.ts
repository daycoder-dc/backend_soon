import { BetterAuthService } from "@/app/core/service/better-auth.service";
import { Session } from "@/app/core/utils/auth";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  constructor (private readonly auth:BetterAuthService) {}

  async getProfile(session: Session) {
    return session?.user;
  }
}
