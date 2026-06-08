import { AuthenticationController } from "./auth.controller";
import { Module } from "@nestjs/common";

@Module({
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
