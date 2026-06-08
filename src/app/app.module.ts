import { DrizzleModule } from '@/app/core/drizzle/drizzle.module';
import { AuthenticationModule } from './feature/auth/auth.module';
import { LogModule } from '@/app/core/interceptor/log.module';
import { UsersModule } from './feature/users/users.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { EnvModule } from '@/app/core/env/env.module';
import { auth } from './core/utils/auth';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    AuthModule.forRoot({
      auth,
      bodyParser: {
        json: { limit: "2mb" },
        urlencoded: { limit: "2mb", extended: true },
        rawBody: true
      }
    }),
    DrizzleModule,
    EnvModule,
    LogModule,
    AuthenticationModule,
    UsersModule
  ],
})
export class AppModule {}
