import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { IEnvType } from "./env.type";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        (): IEnvType => ({
          config: {
            server: {
              host: process.env.SERVER_HOST ?? 'localhost',
              port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 3000,
              env: {
                isDev:  process.env.SERVER_ENV == "dev",
                isProd: process.env.SERVER_ENV == "prod"
              }
            },
            database: {
              host: process.env.PG_HOST ?? 'localhost',
              port: process.env.PG_PORT ? parseInt(process.env.PG_PORT) : 5432,
              user: process.env.PG_USER ?? 'postgres',
              pass: process.env.PG_PASS ? encodeURIComponent(process.env.PG_PASS) : 'postgres',
              name: process.env.PG_NAME ?? 'postgres'
            },
            caching: {
              host: process.env.RDS_HOST ?? 'localhost',
              port: process.env.RDS_PORT ? parseInt(process.env.RDS_PORT) : 6379,
              pass: process.env.RDS_PASS ?? 'redis'
            }
          }
        })
      ]
    })
  ],
  exports: [
    ConfigModule
  ]
})
export class EnvModule {}
