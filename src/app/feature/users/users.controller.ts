import { GetSession } from "@/app/core/utils/session";
import { type Session } from "@/app/core/utils/auth";
import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { UserService } from "./user.service";

@Controller("api/users")
export class UsersController {
  constructor (private readonly user:UserService) {}

  @ApiBearerAuth()
  @Get("me")
  async getProfile(@GetSession() session: Session) {
    return this.user.getProfile(session);
  }
}
