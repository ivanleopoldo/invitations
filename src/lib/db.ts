import { init } from "@instantdb/react";
import schema, { type AppSchema } from "@/instant.schema";

export const db = init<AppSchema>({
  appId: import.meta.env.VITE_INSTANT_APP_ID!,
  schema,
});
