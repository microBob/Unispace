export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });

  browser.tabs.onCreated.addListener((tab) => {
    console.log("Tab created", tab);
  });
});
