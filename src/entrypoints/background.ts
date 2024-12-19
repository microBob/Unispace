import { init } from "@instantdb/core";
import schema from "~/../instant.schema";

export default defineBackground(() => {
  // 1. Connect to InstantDB.
  const db = init({
    appId: import.meta.env.WXT_INSTANT_APP_ID,
    schema,
  });

  // 2. Subscribe to tab changes.
  browser.tabs.onCreated.addListener((tab) => {
    console.log("Tab created", tab);
  });
});
