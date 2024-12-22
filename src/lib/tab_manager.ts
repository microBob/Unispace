import type { Tabs } from "wxt/browser";
import type { DataManager } from "./data_manager";

/**
 * Handle tab interactions.
 */
export class TabManager {
  private readonly dataManager: DataManager;

  constructor(dataManager: DataManager) {
    this.dataManager = dataManager;
  }

  // Getters:

  // Setters:

  // Methods:

  /**
   * Restore tabs as logged in the database.
   */
  async restore() {
    // 1. Remove all previous tabs (doesn't do anything if restore tabs is off).

    // Get the IDs of all tabs in the window.
    const tabs = await browser.tabs.query({ currentWindow: true });
    const tabIds = tabs.map((tab) => tab.id).filter((id) => id !== undefined);

    // Delete all tabs in the window.
    await browser.tabs.remove(tabIds);

    // 2. Recreate tabs in the active workspace.
    const activeWorkspaceTabs = await this.dataManager.getWorkspaceTabs(
      await this.dataManager.getActiveWorkspaceId(),
    );
    await this.createTabs(activeWorkspaceTabs);
    
    // 3. Recreate tabs in the other workspaces, discarded.
  }

  /**
   * Create the given array of tabs.
   *
   * @param setDiscarded Should these tabs be created already discarded.
   */
  async createTabs(tabs: Tabs.Tab[], setDiscarded = false) {
    for (const tab of tabs) {
      const createProperties: Tabs.CreateCreatePropertiesType = {
        ...tab,
        discarded: setDiscarded ? true : tab.discarded,
        muted: tab.mutedInfo?.muted,
        openInReaderMode: tab.isInReaderMode,
        windowId: browser.windows.WINDOW_ID_CURRENT,
      };
      browser.tabs.create(createProperties);
    }
  }

  /**
   * Update database on tab changes.
   */
  subscribeToTabChanges() {
    browser.tabs.onAttached.addListener(async () =>
      this.dataManager.updateActiveWorkspaceTabs(),
    );
    browser.tabs.onCreated.addListener(async () =>
      this.dataManager.updateActiveWorkspaceTabs(),
    );
    browser.tabs.onDetached.addListener(async () =>
      this.dataManager.updateActiveWorkspaceTabs(),
    );
    browser.tabs.onMoved.addListener(async () =>
      this.dataManager.updateActiveWorkspaceTabs(),
    );
    browser.tabs.onRemoved.addListener(async () =>
      this.dataManager.updateActiveWorkspaceTabs(),
    );
    browser.tabs.onUpdated.addListener(async () =>
      this.dataManager.updateActiveWorkspaceTabs(),
    );
  }

  /**
   * Disable updating the database on tab changes.
   */
  unsubscribeToTabChanges() {
    browser.tabs.onAttached.removeListener(async () =>
      this.dataManager.updateActiveWorkspaceTabs(),
    );
    browser.tabs.onCreated.removeListener(async () =>
      this.dataManager.updateActiveWorkspaceTabs(),
    );
    browser.tabs.onDetached.removeListener(async () =>
      this.dataManager.updateActiveWorkspaceTabs(),
    );
    browser.tabs.onMoved.removeListener(async () =>
      this.dataManager.updateActiveWorkspaceTabs(),
    );
    browser.tabs.onRemoved.removeListener(async () =>
      this.dataManager.updateActiveWorkspaceTabs(),
    );
    browser.tabs.onUpdated.removeListener(async () =>
      this.dataManager.updateActiveWorkspaceTabs(),
    );
  }
}
