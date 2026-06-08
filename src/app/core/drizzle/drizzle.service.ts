import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { cnn } from "@/app/core/utils/drizzle";
import { sql } from "drizzle-orm";

@Injectable()
export class DrizzleService implements OnModuleInit {
  private readonly logger = new Logger(DrizzleService.name);
  public readonly db = cnn;

  constructor() {}

  async onModuleInit() {
    try {
      await this.db.execute(sql`SELECT 1`);
      this.logger.log(`Database connected`);
    } catch (err) {
      this.logger.error("Error connection database");
    }
  }
}
