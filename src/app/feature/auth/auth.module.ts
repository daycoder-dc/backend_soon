import { BetterAuthService } from "@/app/core/service/better-auth.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [AuthController],
  providers: [
    BetterAuthService,
    AuthService
  ]
})
export class AuthModule {}
