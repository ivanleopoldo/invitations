import { i } from "@instantdb/react";

const _schema = i.schema({
  entities: {
    invited: i.entity({
      name: i.string(),
      prefix: i.string(),
      max_num_of_attendees: i.number(),
      num_of_attendees: i.number(),
      role: i.string(),
    }),
  },
  links: {},
  rooms: {},
});

// This helps TypeScript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
