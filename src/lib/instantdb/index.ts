import { init } from "@instantdb/react";
import schema from "./schema";

export const db = init({
  appId: import.meta.env.VITE_INSTANT_APP_ID!,
  schema,
});
