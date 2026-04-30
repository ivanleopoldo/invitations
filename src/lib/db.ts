import { init, type InstaQLEntity } from "@instantdb/react";
import schema, { type AppSchema } from "@/instant.schema";

export const db = init({
  appId: import.meta.env.VITE_INSTANT_APP_ID!,
  schema,
});

export type InvitedUser = AppSchema["entities"]["invited"];
