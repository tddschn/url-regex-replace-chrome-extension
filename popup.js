document.addEventListener("DOMContentLoaded", function () {
  const prependButton = document.getElementById("prepend");

  prependButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const prefix = document.getElementById("prefix").value;
      const tabId = tabs[0].id;
      const currentUrl = tabs[0].url;
      const newUrl = prefix + currentUrl;

      chrome.tabs.update(tabId, { url: newUrl });
    });
  });
});
