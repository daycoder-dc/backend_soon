import { Body, Controller, Headers, Post, Res } from "@nestjs/common";
import { ApiBearerAuth, ApiSecurity } from "@nestjs/swagger";
import { SignInDto, SingUpDto } from "./auth.dto";
import { Public } from "@/app/core/utils/public";
import { AuthService } from "./auth.service";
import { type Response } from "express";

@Controller("api/auth")
export class AuthController {
  constructor (private readonly service:AuthService) {}

  @Public()
  @Post("sign-up/email")
  async signUp(@Body() dto: SingUpDto, @Headers() headers: Record<string, string>, @Res({ passthrough: true }) res: Response) {
    return this.service.signUp(dto, headers, res);
  }

  @Public()
  @Post("sign-in/email")
  async signIn(@Body() dto: SignInDto, @Headers() headers: Record<string, string>, @Res({ passthrough: true }) res: Response) {
    return this.service.signIn(dto, headers, res);
  }

  @ApiBearerAuth()
  @Post("sign-out")
  async signOut(@Headers() headers: Record<string, string>, @Res({ passthrough: true }) res: Response) {
    return this.service.signOut(headers, res);
  }
}
