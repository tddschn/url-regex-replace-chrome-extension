document.addEventListener("DOMContentLoaded", function() {
    loadPresets();
    document.getElementById("preset-form").addEventListener("submit", savePreset);
});

function loadPresets() {
    chrome.storage.sync.get(["presets"], function(data) {
        const presets = data.presets || [];
        const listElement = document.getElementById("presets-list");
        listElement.innerHTML = ''; // Clear current list

        presets.forEach((preset, index) => {
            const presetElement = document.createElement("div");
            presetElement.innerHTML = `
                <div>
                    <strong>Find:</strong> ${preset.find} 
                    <strong>Replace:</strong> ${preset.replace}
                    <button onclick="editPreset(${index})">Edit</button>
                    <button onclick="deletePreset(${index})">Delete</button>
                </div>`;
            listElement.appendChild(presetElement);
        });
    });
}

function savePreset(event) {
    event.preventDefault();
    const findPattern = document.getElementById("find-pattern").value;
    const replacePattern = document.getElementById("replace-pattern").value;
    const editingIndex = document.getElementById("editing-index").value;

    chrome.storage.sync.get(["presets"], function(data) {
        const presets = data.presets || [];
        if (editingIndex) {
            presets[editingIndex] = { find: findPattern, replace: replacePattern };
        } else {
            presets.push({ find: findPattern, replace: replacePattern });
        }
        chrome.storage.sync.set({ presets: presets }, function() {
            loadPresets();
            resetForm();
        });
    });
}

function resetForm() {
    document.getElementById("find-pattern").value = '';
    document.getElementById("replace-pattern").value = '';
    document.getElementById("editing-index").value = '';
}

function editPreset(index) {
    chrome.storage.sync.get(["presets"], function(data) {
        const presets = data.presets || [];
        if (presets[index]) {
            document.getElementById("find-pattern").value = presets[index].find;
            document.getElementById("replace-pattern").value = presets[index].replace;
            document.getElementById("editing-index").value = index;
        }
    });
}

function deletePreset(index) {
    chrome.storage.sync.get(["presets"], function(data) {
        let presets = data.presets || [];
        presets.splice(index, 1);
        chrome.storage.sync.set({ presets: presets }, function() {
            loadPresets();
        });
    });
}
