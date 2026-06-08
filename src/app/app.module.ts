import { DrizzleModule } from '@/app/core/drizzle/drizzle.module';
import { LogModule } from '@/app/core/interceptor/log.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { EnvModule } from '@/app/core/env/env.module';
import { Module } from '@nestjs/common';
import { auth } from './core/utils/auth';

@Module({
  imports: [
    AuthModule.forRoot({ auth }),
    DrizzleModule,
    EnvModule,
    LogModule,
  ],
})
export class AppModule {}
