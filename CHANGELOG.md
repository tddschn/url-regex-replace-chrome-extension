# Changelog

- [Changelog](#changelog)
  - [v1.2.0](#v120)
    - [Added](#added)
    - [Changed](#changed)
    - [Fixed](#fixed)
    - [Removed](#removed)
    - [Security](#security)
  - [v1.1.0](#v110)
    - [Added](#added-1)
    - [Changed](#changed-1)
    - [Fixed](#fixed-1)
    - [Removed](#removed-1)
    - [Security](#security-1)

## v1.2.0

### Added
- Regex find and replace functionality to the extension.
- New input fields in the popup for entering regex find and replace patterns.

### Changed
- Updated `popup.js` to handle regex find and replace logic.
- Modified `popup.html` to include new input fields for regex find and replace.
- Altered `manifest.json` to update the extension description and version.

### Fixed
- None

### Removed
- Previous functionality for prefixing URLs.

### Security
- None

## v1.1.0

### Added
- Persistent storage for the URL prefix in `popup.html`. The entered prefix is now saved to `chrome.storage.sync`, which allows the prefix to be retained across different sessions of the extension popup. This enhances user convenience by eliminating the need to re-enter the prefix each time the popup is opened.

### Changed
- Updated `popup.js` to include event listeners for loading the stored prefix value when the popup loads, and for saving the prefix value whenever it is changed by the user.

### Fixed
- None

### Removed
- None

### Security
- None
