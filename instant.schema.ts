// Docs: https://www.instantdb.com/docs/schema

import { i } from "@instantdb/core";
import type { Bookmarks } from "wxt/browser";
import type { TimestampedTab } from "~/utils/types";

const _schema = i.schema({
	// This section lets you define entities: think `posts`, `comments`, etc
	// Take a look at the docs to learn more:
	// https://www.instantdb.com/docs/schema#defining-entities
	entities: {
		$users: i.entity({
			email: i.string().unique().indexed(),
		}),

		/**
		 * Root bookmark node for a bookmarks bar.
		 *
		 * @param bookmarks - The root bookmark node for a bookmarks bar.
		 */
		bookmarksBar: i.entity({
			bookmarks: i.json<Bookmarks.BookmarkTreeNode>().unique().indexed(),
		}),

		/**
		 * Tab workspace.
		 *
		 * @remarks
		 * A workspace is a collection of tabs and a link to a bookmarks bar.
		 *
		 * @param name - Name of the workspace.
		 * @param icon - Image URL for the icon.
		 * @param color - Color for the workspace.
		 * @param defaultContainer - Default container for new tabs.
		 * @param tabs - Ordered @link TimestampedTab in the workspace.
		 */
		workspace: i.entity({
			name: i.string().unique().indexed(),
			icon: i.string().optional(),
			color: i.string().optional(),
			defaultContainer: i.string().optional(),
			tabs: i.json<Array<TimestampedTab>>().optional(),
		}),
	},
	// You can define links here.
	// For example, if `posts` should have many `comments`.
	// More in the docs:
	// https://www.instantdb.com/docs/schema#defining-links
	links: {
		// Allow users to reuse bookmarks in multiple workspaces.
		workspaceBookmarks: {
			forward: {
				on: "workspace",
				has: "one",
				label: "bookmarksBar",
			},
			reverse: {
				on: "bookmarksBar",
				has: "many",
				label: "workspace",
			},
		},
	},
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
