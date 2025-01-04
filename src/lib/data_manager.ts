import type { AppSchema } from "@@/instant.schema";
import { type InstantCoreDatabase, id } from "@instantdb/core";
import type { Tabs } from "wxt/browser";

/**
 * Handle interactions with the database.
 */
export class DataManager {
  /** InstantDB connection. */
  private readonly db: InstantCoreDatabase<AppSchema>;

  constructor(db: InstantCoreDatabase<AppSchema>) {
    this.db = db;
  }

  // Getters:

  /**
   * Get the active workspace ID.
   *
   * @throws Error if no workspace set exists.
   */
  async getActiveWorkspaceId(): Promise<string> {
    // Query for workspace sets.
    const workspaceSetsResponse = await this.db.queryOnce({
      workspaceSet: {},
    });
    const workspaceSets = workspaceSetsResponse.data.workspaceSet;

    // Throw error if no workspace set exist.
    if (workspaceSets.length === 0) {
      throw new Error(
        "Can't get active workspace ID. No workspace set exists.",
      );
    }

    // Otherwise, pull from the first workspace set (for now).
    const firstWorkspaceSet = workspaceSets[0];
    return firstWorkspaceSet.workspaces[firstWorkspaceSet.activeWorkspaceIndex];
  }

  /**
   * Get all workspace ID's
   *
   * @throws Error if no workspace set exists.
   *
   * @returns
   * Pulls the ordered list of ID's of the user's first workspace set.
   */
  async getWorkspaceIds(): Promise<string[]> {
    // Query for workspace set.
    const workspaceSetsResponse = await this.db.queryOnce({ workspaceSet: {} });
    const workspaceSets = workspaceSetsResponse.data.workspaceSet;

    // Throw error if no workspaces exist.
    if (workspaceSets.length === 0) {
      throw new Error(
        "Can't get workspace ID's because none exist (no workspace set).",
      );
    }

    // Otherwise, return their ID's.
    return workspaceSets[0].workspaces;
  }

  /**
   * Get tabs for a workspace.
   *
   * @throws Error if workspace doesn't exist.
   */
  async getWorkspaceTabs(workspaceId: string): Promise<Tabs.Tab[]> {
    // Query for workspace.
    const workspacesResponse = await this.db.queryOnce({
      workspace: {
        $: {
          where: {
            id: workspaceId,
          },
        },
      },
    });
    const matchingWorkspaces = workspacesResponse.data.workspace;

    // Throw error if workspace doesn't exist.
    if (matchingWorkspaces.length === 0) {
      throw new Error(`Workspace with ID ${workspaceId} does not exist.`);
    }

    // Return tabs (there will be exactly 1 workspace).
    return matchingWorkspaces[0].tabs;
  }

  // Setters:

  /**
   * Create a blank workspace with the given name.
   *
   * @param name - New name to give workspace.
   *
   * @returns ID of the created workspace.
   */
  async createWorkspace(name: string): Promise<string> {
    const workspaceId = id();
    await this.db.transact(
      this.db.tx.workspace[workspaceId].update({ name: name }),
    );
    return workspaceId;
  }

  /**
   * Create a blank workspace set with a single workspace.
   *
   * @remarks
   * This should only be used to help initialize a new user.
   */
  async createDefaultWorkspaceSet() {
    // Check if workspace sets exist.
    const workspaceSetsResponse = await this.db.queryOnce({ workspaceSet: {} });

    // Exit if workspace sets already exist.
    if (workspaceSetsResponse.data.workspaceSet.length > 0) {
      return;
    }

    // Create default workspace.
    await this.db.transact(
      this.db.tx.workspaceSet[id()].update({
        workspaces: [await this.createWorkspace("Workspace 1")],
        activeWorkspaceIndex: 0,
      }),
    );
  }

  /**
   * Overwrite the workspace's tabs with the current window's tabs.
   *
   * @param workspaceId - Workspace to update.
   */
  async updateWorkspaceTabs(workspaceId: string) {
    // Get current window tabs.
    const currentWindowTabs = await browser.tabs.query({ currentWindow: true });
    console.log(currentWindowTabs);

    // Update workspace tabs.
    await this.db.transact(
      this.db.tx.workspace[workspaceId].update({
        tabs: currentWindowTabs as Tabs.Tab[],
      }),
    );
  }

  /**
   * Overwrite active workspace's tabs with the current window's tabs
   */
  async updateActiveWorkspaceTabs() {
    await this.updateWorkspaceTabs(await this.getActiveWorkspaceId());
  }
}
