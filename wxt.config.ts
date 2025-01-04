import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-svelte"],
  manifest: {
    permissions: ["contextualIdentities", "cookies"],
    commands: {
      _execute_browser_action: {
        suggested_key: {
          default: "Ctrl+Shift+Comma",
        },
        description: "Open Workspace Switcher",
      },
    },
  },
});
