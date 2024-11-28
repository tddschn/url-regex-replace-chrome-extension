document.addEventListener("DOMContentLoaded", function () {
  loadPresets();
  document.getElementById("preset-form").addEventListener("submit", savePreset);
  // Add event listeners for export and import buttons
  document
    .getElementById("export-button")
    .addEventListener("click", exportPresets);
  document
    .getElementById("import-file")
    .addEventListener("change", importPresets);
});

function loadPresets() {
  chrome.storage.sync.get(["presets"], function (data) {
    const presets = data.presets || [];
    const listElement = document.getElementById("presets-list");
    listElement.innerHTML = ""; // Clear current list

    presets.forEach((preset, index) => {
      const presetElement = document.createElement("div");
      presetElement.innerHTML = `
                <div>
                    <strong>Find:</strong> ${preset.find} 
                    <strong>Replace:</strong> ${preset.replace}
                </div>`;
      // Create Edit button
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", function () {
        editPreset(index);
      });
      // Create Delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
        deletePreset(index);
      });
      presetElement.appendChild(editButton);
      presetElement.appendChild(deleteButton);
      listElement.appendChild(presetElement);
    });
  });
}

function savePreset(event) {
  event.preventDefault();
  const findPattern = document.getElementById("find-pattern").value;
  const replacePattern = document.getElementById("replace-pattern").value;
  const editingIndex = document.getElementById("editing-index").value;

  chrome.storage.sync.get(["presets"], function (data) {
    const presets = data.presets || [];
    if (editingIndex) {
      presets[editingIndex] = { find: findPattern, replace: replacePattern };
    } else {
      presets.push({ find: findPattern, replace: replacePattern });
    }
    chrome.storage.sync.set({ presets: presets }, function () {
      loadPresets();
      resetForm();
    });
  });
}

function resetForm() {
  document.getElementById("find-pattern").value = "";
  document.getElementById("replace-pattern").value = "";
  document.getElementById("editing-index").value = "";
}

function editPreset(index) {
  chrome.storage.sync.get(["presets"], function (data) {
    const presets = data.presets || [];
    if (presets[index]) {
      document.getElementById("find-pattern").value = presets[index].find;
      document.getElementById("replace-pattern").value = presets[index].replace;
      document.getElementById("editing-index").value = index;
    }
  });
}

function deletePreset(index) {
  chrome.storage.sync.get(["presets"], function (data) {
    let presets = data.presets || [];
    presets.splice(index, 1);
    chrome.storage.sync.set({ presets: presets }, function () {
      loadPresets();
    });
  });
}

function exportPresets() {
  chrome.storage.sync.get(["presets"], function (data) {
    const presets = data.presets || [];
    const presetsJson = JSON.stringify(presets, null, 2);
    const blob = new Blob([presetsJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `URL-Regex-Replace-${timestamp}-presets.json`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  });
}

function importPresets(event) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const presets = JSON.parse(e.target.result);
      if (Array.isArray(presets)) {
        chrome.storage.sync.set({ presets: presets }, function () {
          loadPresets();
          window.alert("Presets imported successfully.");
        });
      } else {
        window.alert("Invalid presets file.");
      }
    } catch (err) {
      window.alert("Error reading presets file.");
    }
  };
  reader.readAsText(file);
}
