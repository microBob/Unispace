import type { Bookmarks, Tabs } from "wxt/browser";

/**
 * Add last used attribute to @link Tabs.Tab.
 *
 * @param lastUsed - Date object marking when the tab was last used.
 */
export interface TimestampedTab extends Tabs.Tab {
  lastUsed: Date;
}

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
 * @param bookmarks - Root folder node for this workspace's bookmarks bar.
 * @param tabs - Ordered @link TimestampedTab in the workspace.
 */
export interface Workspace {
  name: string;
  icon?: string;
  color?: string;
  defaultContainer?: string;
  bookmarks?: Bookmarks.BookmarkTreeNode;
  tabs?: TimestampedTab[];
}

export interface WorkspaceSet {
  id: string;
  name: string;
  workspaces: Workspace[];
  activeWorkspaceIndex: number;
}
