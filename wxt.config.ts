import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-svelte"],
  manifest: {
    permissions: ["contextualIdentities", "cookies"],
    "commands": {
      "_execute_action": {
        "suggested_key": {
          "default": "Ctrl+Shift.",
        },
        "description": "Open Workspace Switcher"
      }
    }
  },
});
