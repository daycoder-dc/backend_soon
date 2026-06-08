import * as schemas from "@/app/core/schemas/index";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const HOST = String(process.env.PG_HOST);
const PORT = String(process.env.PG_PORT);
const USER = String(process.env.PG_USER);
const PASS = encodeURIComponent(String(process.env.PG_PASS));
const NAME = String(process.env.PG_NAME);

const pool = new Pool({
  connectionString: `postgres://${USER}:${PASS}@${HOST}:${PORT}/${NAME}`
});

export const cnn = drizzle({
  client: pool,
  schema: schemas
});
