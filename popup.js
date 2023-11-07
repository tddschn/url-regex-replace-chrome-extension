document.addEventListener("DOMContentLoaded", function () {
  const prependButton = document.getElementById("prepend");
  const prefixInput = document.getElementById("prefix");

  // Load the saved prefix value when the popup is opened.
  chrome.storage.sync.get("savedPrefix", function (data) {
    if (data.savedPrefix) {
      prefixInput.value = data.savedPrefix;
    }
  });

  // Listen for changes in the input field to save them.
  prefixInput.addEventListener("change", function () {
    const prefix = prefixInput.value;
    chrome.storage.sync.set({ "savedPrefix": prefix });
  });

  prependButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const prefix = prefixInput.value;
      const tabId = tabs[0].id;
      const currentUrl = tabs[0].url;
      const newUrl = prefix + currentUrl;

      chrome.tabs.update(tabId, { url: newUrl });
    });
  });
});
