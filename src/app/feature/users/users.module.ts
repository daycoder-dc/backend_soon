import { BetterAuthService } from "@/app/core/service/better-auth.service";
import { UsersController } from "./users.controller";
import { UserService } from "./user.service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [ UsersController ],
  providers: [
    BetterAuthService,
    UserService
  ]
})
export class UsersModule {}
