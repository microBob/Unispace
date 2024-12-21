import { DataManager } from "@/lib/data_manager";
import schema from "@@/instant.schema";
import { init } from "@instantdb/core";

export default defineBackground(async () => {
  // 1. Connect to InstantDB.
  const db = init({
    appId: import.meta.env.WXT_INSTANT_APP_ID,
    schema,
  });

  // 2. Instantiate data manager.
  const dataManager = new DataManager(db);
  
  console.log(await dataManager.getActiveWorkspaceId());

  // 2. Subscribe to tab changes.
  browser.tabs.onUpdated.addListener((tab) => {
    console.log("Tab changed", tab);
  });
});
