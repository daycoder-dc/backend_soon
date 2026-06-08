import { AuthService } from "@thallesp/nestjs-better-auth";
import { Body, Controller, Post } from "@nestjs/common";
import { SignInDto, SingUpDto } from "./auth.dto";

@Controller("api/auth")
export class AuthenticationController {
  constructor (private readonly auth: AuthService) {}

  @Post("sign-up/email")
  async signUp(@Body() dto: SingUpDto) {
    return this.auth.api.signUpEmail({
      returnHeaders: true,
      returnStatus: true,
      body: {
        name: dto.name,
        email: dto.email,
        password: dto.password,
        image: dto.image,
        callbackURL: undefined
      }
    });
  }

  @Post("sign-in/email")
  async signIn(@Body() dto: SignInDto) {
    return this.auth.api.signInEmail({
      returnHeaders: true,
      returnStatus: true,
      body: {
        email: dto.email,
        password: dto.password,
        rememberMe: dto.remenberMe,
        callbackURL: undefined
      }
    })
  }

  @Post("sign-out")
  async signOut() {
    return this.auth.api.signOut();
  }
}
