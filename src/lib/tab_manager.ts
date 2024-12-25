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
    // 1. Get all tabs in the window (to be removed later).
    const tabs = await browser.tabs.query({ currentWindow: true });
    const tabIds = tabs.map((tab) => tab.id).filter((id) => id !== undefined);

    // 2. Recreate tabs (in the data, there should only be one active tab).
    const workspaceIds = await this.dataManager.getWorkspaceIds();
    for (const workspaceId of workspaceIds) {
      await this.createTabs(
        await this.dataManager.getWorkspaceTabs(workspaceId),
      );
    }

    // 4. Delete all old tabs in the window.
    browser.tabs.remove(tabIds);
  }

  /**
   * Create the given array of tabs.
   *
   * @remarks
   * This will create new ID's and copy over all the other properties.
   */
  async createTabs(tabs: Tabs.Tab[]) {
    for (const tab of tabs) {
      const createProperties: Tabs.CreateCreatePropertiesType = {
        active: tab.active,
        cookieStoreId: tab.cookieStoreId,
        discarded: tab.discarded,
        index: tab.index,
        muted: tab.mutedInfo?.muted,
        openerTabId: tab.openerTabId,
        openInReaderMode: tab.isInReaderMode,
        pinned: tab.pinned,
        url: tab.url,
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
