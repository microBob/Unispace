import { mount } from "svelte";
import App from "./App.svelte";

const appElement = document.getElementById("app");
if (!appElement) {
  throw new Error("Failed to get app element");
}

const app = mount(App, {
  target: appElement,
});

export default app;
