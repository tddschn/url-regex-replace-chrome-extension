chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    // Fetch default presets from default-presets.json
    fetch(chrome.runtime.getURL('default-presets.json'))
      .then(response => response.json())
      .then(defaultPresets => {
        chrome.storage.sync.set({ presets: defaultPresets });
      })
      .catch(error => {
        console.error('Error loading default presets:', error);
      });
  } else if (details.reason == "update") {
    // This code runs when the extension is updated
    // Handle update-related tasks, if any
  }
});

chrome.commands.onCommand.addListener(function (command) {
  if (command === "switch-to-replace-tab" || command === "switch-to-presets-tab") {
    const tabName = command === "switch-to-replace-tab" ? "Replace" : "Presets";
    // Send a message to the popup (if it's open)
    chrome.runtime.sendMessage({ action: "switchTab", tabName: tabName });
  }
});
