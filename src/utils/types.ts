import type { Tabs } from "wxt/browser";

/**
 * Tab workspace.
 *
 * @remarks
 * A workspace is a collection of tabs and a link to a bookmarks bar.
 *
 * @param id - Database identifier.
 * @param name - Name of the workspace.
 * @param icon - Image URL for the icon.
 * @param color - Color for the workspace.
 * @param defaultContainer - Default container for new tabs.
 * @param tabs - Ordered list of tabs in the workspace.
 */
export interface Workspace {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  tabs: Tabs.Tab[];
}

/**
 * User workspaces and state.
 *
 * @remarks
 * Keeps the ordered list of workspaces and which one is currently active.
 *
 * @param id - Database identifier.
 * @param workspaces - List of workspaces by the user.
 * @param activeWorkspaceIndex - Which workspace is currently active by the user.
 */
export interface WorkspaceSet {
  id: string;
  workspaces: string[];
  activeWorkspaceIndex: number;
}
