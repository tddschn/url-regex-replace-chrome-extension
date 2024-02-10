document.addEventListener("DOMContentLoaded", function () {
  const findInput = document.getElementById("find");
  const replaceInput = document.getElementById("replace");
  const replaceButton = document.getElementById("replace-url");

  // Initialize the flag used to check for "ReplaceURL" keyboard shortcut
  chrome.storage.local.set({replaceUrlTriggered: false});

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
    replaceUrl(findInput.value, replaceInput.value);
   });

  // Listen for Replace in URL keyboard shortcut
  chrome.storage.onChanged.addListener(function(changes) {
    for (let [key, { newValue }] of Object.entries(changes)) {
      if (key === "replaceUrlTriggered" && newValue === true) {
        // Perform the action as if the replace-url button was clicked
        replaceUrl(findInput.value, replaceInput.value);
        // Reset the flag immediately to prevent re-triggering
        chrome.storage.local.set({replaceUrlTriggered: false});
      }
    }
  });

  loadPresetsForPopup();
});

function replaceUrl(searchExp, replaceValue) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const findPattern = new RegExp(searchExp);
    const currentUrl = tabs[0].url;

    // Check if the find pattern is found in the current URL
    if (!currentUrl.match(findPattern)) {
      window.alert("Find pattern not found in the current URL.");
      return;
    }

    const newUrl = currentUrl.replace(findPattern, replaceValue);

    // Define the function to push the URL to history and navigate forward
    function pushUrlToHistory() {
      window.history.pushState({}, "", currentUrl);
      window.history.forward();
    }

    // Use chrome.scripting.executeScript to run the script
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        func: pushUrlToHistory,
      },
      function () {
        chrome.tabs.update(tabs[0].id, { url: newUrl });
      }
    );
  });
}

function loadPresetsForPopup() {
  chrome.storage.sync.get(["presets"], function (data) {
    const presets = data.presets || [];
    const presetsContainer = document.getElementById("presets-container");
    presetsContainer.innerHTML = ""; // Clear current list

    presets.forEach((preset, index) => {
      const presetElement = document.createElement("button");
      presetElement.textContent = `Use: ${preset.find} -> ${preset.replace}`;
      presetElement.addEventListener("click", function () {
        applyPreset(preset);
      });
      presetsContainer.appendChild(presetElement);
    });
  });
  // Setup tab event listeners
  document
    .getElementById("replaceTab")
    .addEventListener("click", function (event) {
      openTab(event, "Replace");
    });
  document
    .getElementById("presetsTab")
    .addEventListener("click", function (event) {
      openTab(event, "Presets");
    });

  // Open the default tab (e.g., Replace)
  openTab(new Event("click"), "Replace");
}

function applyPreset(preset) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const findPattern = new RegExp(preset.find);
    const replaceValue = preset.replace;
    const currentUrl = tabs[0].url;

    if (!currentUrl.match(findPattern)) {
      window.alert("Find pattern not found in the current URL.");
      return;
    }

    const newUrl = currentUrl.replace(findPattern, replaceValue);

    chrome.tabs.update(tabs[0].id, { url: newUrl });
  });
}

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;

  // Hide all elements with class="tabcontent"
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove "active" class from all elements with class="tablinks"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  // Show the current tab and add "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  if (evt && evt.currentTarget) {
    evt.currentTarget.classList.add("active");
  }
}

// Example usage: Add event listeners to tab buttons
document.querySelectorAll(".tablinks").forEach((button) => {
  button.addEventListener("click", function (event) {
    openTab(event, button.getAttribute("data-tab"));
  });
});
