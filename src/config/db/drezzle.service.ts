import { Inject, Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { DRIZZLE_CONFIG, type IDrizzleConfig } from "./drezzle.config";
import { drizzle } from "drizzle-orm/node-postgres";
import { ConfigService } from "@nestjs/config";
import { IEnvConfg } from "../env.module";
import { sql } from "drizzle-orm";


@Injectable()
export class DrizzleService implements OnModuleInit {
  private readonly logger = new Logger(DrizzleService.name);
  public db!: ReturnType<typeof drizzle>;

  constructor (
    private readonly config: ConfigService<IEnvConfg>,
    @Inject(DRIZZLE_CONFIG) private readonly options?: IDrizzleConfig,
  ) {}

  async onModuleInit() {
    const db = this.config.get<IEnvConfg["config"]>("config")?.database!;
    const url = `postgres://${db.user}:${db.pass}@${db.host}:${db.port}/${db.name}`;
    this.db = drizzle(url, { ...this.options?.params });

    await this.db.execute(sql`SELECT 1`);
    this.logger.log(`Database connected (Postgres/${db.name})`);
  }
}
