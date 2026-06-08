import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";
import { cnn } from "./drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(cnn, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true
  }
});
