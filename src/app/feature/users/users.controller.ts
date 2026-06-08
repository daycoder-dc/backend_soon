import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { Controller, Get } from "@nestjs/common";
import { ApiSecurity } from "@nestjs/swagger";

@ApiSecurity("ApiKey")
@Controller("api/users")
export class UsersController {

  @Get("me")
  async getProfile(@Session() session: UserSession) {
    return { user: session.user };
  }
}
