import { DataManager } from "@/lib/data_manager";
import { TabManager } from "@/lib/tab_manager";
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

  // 3. Instantiate tab manager.
  const tabManager = new TabManager(dataManager);

  // 4. Initialize the database for a new user (does nothing for returning).
  dataManager.createDefaultWorkspaceSet().then(() => {
    // Restore active workspace.
    tabManager.restore();

    // Start listening to tab changes.
    tabManager.subscribeToTabChanges();
  });

  // 5. Establish communication with popup.
});
