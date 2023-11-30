document.addEventListener("DOMContentLoaded", function () {
  const findInput = document.getElementById("find");
  const replaceInput = document.getElementById("replace");
  const replaceButton = document.getElementById("replace-url");

  // Load the saved find and replace values.
  chrome.storage.sync.get(["savedFind", "savedReplace"], function (data) {
    if (data.savedFind) {
      findInput.value = data.savedFind;
    }
    if (data.savedReplace) {
      replaceInput.value = data.savedReplace;
    }
  });

  // Save the find and replace values.
  findInput.addEventListener("change", function () {
    chrome.storage.sync.set({ savedFind: findInput.value });
  });

  replaceInput.addEventListener("change", function () {
    chrome.storage.sync.set({ savedReplace: replaceInput.value });
  });

  replaceButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const findPattern = new RegExp(findInput.value);
      const replaceValue = replaceInput.value;
      const currentUrl = tabs[0].url;

      // Check if the find pattern is found in the current URL
      if (!currentUrl.match(findPattern)) {
        window.alert("Find pattern not found in the current URL.");
        return;
      }

      const newUrl = currentUrl.replace(findPattern, replaceValue);
      chrome.tabs.update(tabs[0].id, { url: newUrl });
    });
  });
});
