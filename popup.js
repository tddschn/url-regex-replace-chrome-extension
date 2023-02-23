document.addEventListener("DOMContentLoaded", function () {
  const prependButton = document.getElementById("prepend");

  prependButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length === 0) {
        console.log("No active tabs found.");
        return;
      }

      const prefix = document.getElementById("prefix").value;
      const url = new URL(tabs[0].url);
      const newUrl = prefix + url;

      chrome.tabs.update(tabs[0].id, { url: newUrl });
    });
  });
});
