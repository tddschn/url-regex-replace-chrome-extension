# Changelog

- [Changelog](#changelog)
  - [v1.1.0](#v110)
    - [Added](#added)
    - [Changed](#changed)
    - [Fixed](#fixed)
    - [Removed](#removed)
    - [Security](#security)

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
