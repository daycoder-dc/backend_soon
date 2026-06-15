import Redis from "ioredis";

const HOST = String(process.env.RDS_HOST);
const PORT = parseInt(String(process.env.RDS_PORT));
const PASS = String(process.env.RDS_PASS)

export const redis = new Redis({
  host: HOST,
  port: PORT,
  password: PASS
});
