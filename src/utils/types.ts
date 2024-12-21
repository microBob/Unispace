import type { Tabs } from "wxt/browser";

export interface WorkspaceTab extends Tabs.Tab {
  workspaceId: string;
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
 * @param tabs - Ordered list of tabs in the workspace.
 */
export interface Workspace {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  tabs: WorkspaceTab[];
}

export interface WorkspaceSet {
  id: string;
  name: string;
  workspaces: string[];
  activeWorkspaceIndex: number;
}
