import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schemas/index.ts",
  out: "./drizzle",
  dbCredentials: {
    host: process.env.PG_HOST ?? "localhost",
    port: Number(process.env.PG_PORT ?? 5432),
    user: process.env.PG_USER ?? "postgres",
    password: process.env.PG_PASS ?? "postgres",
    database: process.env.PG_NAME ?? "postgres",
  },
});
