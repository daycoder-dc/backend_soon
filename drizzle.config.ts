import { defineConfig } from "drizzle-kit";
import "dotenv/config";

const HOST = String(process.env.PG_HOST);
const PORT = String(process.env.PG_PORT);
const USER = String(process.env.PG_USER);
const PASS = encodeURIComponent(String(process.env.PG_PASS));
const NAME = String(process.env.PG_NAME);

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/app/core/drizzle/schemas/index.ts",
  out: "./drizzle",
  breakpoints: true,
  strict: true,
  verbose: true,
  dbCredentials: {
    url: `postgres://${USER}:${PASS}@${HOST}:${PORT}/${NAME}`
  },
});
