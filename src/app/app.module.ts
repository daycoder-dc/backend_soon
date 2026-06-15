import { BetterAuthService } from './core/service/better-auth.service';
import { DrizzleModule } from '@/app/core/drizzle/drizzle.module';
import { LogModule } from '@/app/core/interceptor/log.module';
import { UsersModule } from './feature/users/users.module';
import { AuthModule } from './feature/auth/auth.module';
import { EnvModule } from '@/app/core/env/env.module';
import { AuthGuard } from './core/guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    DrizzleModule,
    EnvModule,
    LogModule,
    AuthModule,
    UsersModule
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: BetterAuthService, useClass: BetterAuthService }
  ]
})
export class AppModule {}
