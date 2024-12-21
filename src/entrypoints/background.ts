import { DataManager } from "@/lib/data_manager";
import schema from "@@/instant.schema";
import { init } from "@instantdb/core";

export default defineBackground(() => {
  // 1. Connect to InstantDB.
  const db = init({
    appId: import.meta.env.WXT_INSTANT_APP_ID,
    schema,
  });

  // 2. Instantiate data manager.
  const dataManager = new DataManager(db);

  // 3. Subscribe to tab changes.
  browser.tabs.onAttached.addListener(async () =>
    dataManager.updateActiveWorkspaceTabs(),
  );
  browser.tabs.onCreated.addListener(async () =>
    dataManager.updateActiveWorkspaceTabs(),
  );
  browser.tabs.onDetached.addListener(async () =>
    dataManager.updateActiveWorkspaceTabs(),
  );
  browser.tabs.onMoved.addListener(async () =>
    dataManager.updateActiveWorkspaceTabs(),
  );
  browser.tabs.onRemoved.addListener(async () =>
    dataManager.updateActiveWorkspaceTabs(),
  );
  browser.tabs.onUpdated.addListener(async () =>
    dataManager.updateActiveWorkspaceTabs(),
  );
});
