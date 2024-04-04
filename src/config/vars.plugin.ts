import "dotenv/config";
import env from "env-var";

export const vars = {
  PORT: env.get("PORT").asPortNumber(),
  MAILER_EMAIL: env.get("MAILER_EMAIL").asEmailString(),
  MAILER_PASSWORD: env.get("MAILER_PASSWORD").asString(),
  PROD: env.get("PROD").asBool(),
};
