import { init } from "@instantdb/core";
import schema from "@/../instant.schema";
import type { Workspace, WorkspaceSet } from "@/utils/types";

export default defineBackground(() => {
  // 1. Connect to InstantDB.
  const db = init({
    appId: import.meta.env.WXT_INSTANT_APP_ID,
    schema,
  });

  // 2. Establish state.
  let workspaces: Workspace[] = [];
  let activeWorkspaceIndex = 0;

  // 3. Pull current state from the database.
  db.queryOnce({ workspaceSet: {} }).then((response) => {
    const worksapceSet: WorkspaceSet = response.data.workspaceSet;
    workspaces = worksapceSet.workspaces;
    activeWorkspaceIndex = worksapceSet.activeWorkspaceIndex;
  });

  // 2. Subscribe to tab changes.
  browser.tabs.onUpdated.addListener((tab) => {
    console.log("Tab changed", tab);
  });
});
