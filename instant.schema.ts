// Docs: https://www.instantdb.com/docs/schema

import { i } from "@instantdb/core";
import type { Tabs } from "wxt/browser";

const _schema = i.schema({
  // This section lets you define entities: think `posts`, `comments`, etc
  // Take a look at the docs to learn more:
  // https://www.instantdb.com/docs/schema#defining-entities
  entities: {
    $users: i.entity({
      email: i.string().unique().indexed(),
    }),

    workspace: i.entity({
      id: i.string().unique().indexed(),
      name: i.string().unique(),
      icon: i.string().optional(),
      color: i.string().optional(),
      tabs: i.json<Tabs.Tab[]>(),
    }),

    workspaceSet: i.entity({
      id: i.string().unique().indexed(),
      name: i.string().unique(),
      workspaces: i.json<string[]>(),
      activeWorkspaceIndex: i.number(),
    }),
  },
  // You can define links here.
  // For example, if `posts` should have many `comments`.
  // More in the docs:
  // https://www.instantdb.com/docs/schema#defining-links
  links: {},
  // If you use presence, you can define a room schema here
  // https://www.instantdb.com/docs/schema#defining-rooms
  rooms: {},
});

// This helps Typescript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
