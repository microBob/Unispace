import { init, id } from "@instantdb/core";
import schema from "~/../instant.schema";

export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });

  // 1. Connect to InstantDB.
  const db = init({
    appId: import.meta.env.WXT_INSTANT_APP_ID,
    schema,
  });

  console.log(db.transact(db.tx.workspace[id()].update({ name: "Test Workspace" })));

  browser.tabs.onCreated.addListener((tab) => {
    console.log("Tab created", tab);
  });
});
