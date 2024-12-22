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
  
  restoreWorkspace(workspaceId: string) {
    
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
