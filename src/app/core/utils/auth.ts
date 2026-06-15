import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { redisStorage } from "@better-auth/redis-storage";
import { bearer } from "better-auth/plugins";
import { betterAuth } from "better-auth";
import { corsOrigins } from "./cors";
import { cnn } from "./drizzle";
import { redis } from "./redis";

export type Session = typeof auth.$Infer.Session;

export const auth = betterAuth({
  database: drizzleAdapter(cnn, {
    provider: "pg"
  }),
  appName: "soon-api",
  trustedOrigins: corsOrigins,
  advanced: {
    trustedProxyHeaders: true,
    cookiePrefix: "soon-api",
    useSecureCookies: process.env.SERVER_ENV != "dev",
    crossSubDomainCookies: {
      enabled: true
    }
  },
  secondaryStorage: redisStorage({
    client: redis,
    keyPrefix: "better-auth"
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    disableSignUp: false,
    minPasswordLength: 8,
    maxPasswordLength: 15,
    // requireEmailVerification: true
  },
  session: {
    expiresIn: 60 * 60 * 8,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
      strategy: "compact"
    }
  },
  plugins: [
    bearer()
  ]
});
