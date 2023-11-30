# URL Regex Replace Chrome Extension

![URL Regex Replace Icon](icons/icon.png)

The **URL Regex Replace** is a Chrome extension that allows users to perform regex find and replace on the current tab's URL. This is useful for various tasks such as quickly modifying URLs, testing, or redirecting to different environments.

## Features

- Simple and lightweight.
- Ability to use regular expressions for URL modifications.
- Customizable find and replace fields.

## Installation

You can install the **URL Regex Replace** extension from the [Chrome Web Store](https://chrome.google.com/webstore/detail/url-regex-replace/nkohlbebkognioabnnjchnchdapolofb).

## Usage

1. Click on the extension icon in the toolbar.
2. Enter the regex pattern in the 'Find' field and the replacement string in the 'Replace' field.
3. Click on the "Replace in URL" button to update the current tab's URL based on your regex pattern.

## Development

To contribute to the development of this extension, clone the repository and load it locally as an unpacked extension in Chrome.

## Building the Extension

Use the included `Makefile` for packaging:

- `make package` to create a zip file for distribution.
- `make list` to list the contents of the zip package.
- `make clean` to remove the zip file.

## Support

Open an issue [here](https://github.com/tddschn/url-regex-replace-chrome-extension/issues/new).

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
