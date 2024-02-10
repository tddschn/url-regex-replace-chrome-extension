chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    // This code runs only when the extension is first installed
    const defaultPresets = [
      { find: "^", replace: "https://web.archive.org/web/" },
      { find: "^", replace: "https://archive.is/" },
      { find: "^https://", replace: "https://sourcegraph.com/" },
    ];
    chrome.storage.sync.set({ presets: defaultPresets });
  } else if (details.reason == "update") {
    // This code runs when the extension is updated
    // Handle update-related tasks, if any
  }
});

// Listen for keyboard shortcut to replace the URL
chrome.commands.onCommand.addListener(function(command) {
  if (command === "replace-url") {
    // Set a flag that the popup can check
    chrome.storage.local.set({replaceUrlTriggered: true});
  }
});
