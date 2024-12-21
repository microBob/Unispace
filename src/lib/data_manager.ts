import type { AppSchema } from "@@/instant.schema";
import { type InstantCoreDatabase, id } from "@instantdb/core";
import type { Tabs } from "wxt/browser";

export class DataManager {
  private readonly db: InstantCoreDatabase<AppSchema>;
  constructor(db: InstantCoreDatabase<AppSchema>) {
    this.db = db;
  }

  // Getters:

  /**
   * Get the active workspace ID.
   *
   * @remarks
   * If no workspace set exists, a default workspace set is created.
   */
  async getActiveWorkspaceId(): Promise<string> {
    // Query for workspace sets.
    const allWorkspaceSetsResponse = await this.db.queryOnce({
      workspaceSet: {},
    });
    const workspaceSets = allWorkspaceSetsResponse.data.workspaceSet;

    // Create default workspace set if it doesn't exist.
    if (workspaceSets.length === 0) {
      return this.createWorkspaceSet("Default Workspace Set").workspaceId;
    }

    // Otherwise, pull from the first workspace set (for now).
    const firstWorkspaceSet = workspaceSets[0];
    return firstWorkspaceSet.workspaces[firstWorkspaceSet.activeWorkspaceIndex];
  }

  // Setters:

  /**
   * Create a blank workspace with the given name.
   *
   * @returns ID for the workspace.
   */
  createWorkspace(name: string): string {
    const workspaceId = id();
    this.db.transact(this.db.tx.workspace[workspaceId].update({ name: name }));
    return workspaceId;
  }

  /**
   * Create a blank workspace set with a single workspace.
   *
   * @returns The created workspace's ID and the workspace set's ID.
   */
  createWorkspaceSet(name: string): {
    workspaceId: string;
    workspaceSetId: string;
  } {
    const workspaceId = this.createWorkspace("Workspace 1");
    const workspaceSetId = id();
    this.db.transact(
      this.db.tx.workspaceSet[workspaceSetId].update({
        name: name,
        workspaces: [workspaceId],
        activeWorkspaceIndex: 0,
      }),
    );
    return { workspaceId, workspaceSetId };
  }

  /**
   * Overwrite the workspace's tabs with the current window's tabs.
   */
  async updateWorkspaceTabs(workspaceId: string) {
    // Get current window tabs.
    const currentWindowTabs = await browser.tabs.query({ currentWindow: true });
    console.log(currentWindowTabs);

    // Update workspace tabs.
    this.db.transact(
      this.db.tx.workspace[workspaceId].update({
        tabs: currentWindowTabs as Tabs.Tab[],
      }),
    );
  }

  /**
   * Overwrite active workspace's tabs with the current window's tabs
   */
  async updateActiveWorkspaceTabs() {
    const activeWorkspaceId = await this.getActiveWorkspaceId();
    this.updateWorkspaceTabs(activeWorkspaceId);
  }
}
