EXTENSION_NAME := prepend-url
VERSION := $(shell jq -r '.version' manifest.json)

.PHONY: package
package:
	@echo "Packaging $(EXTENSION_NAME) version $(VERSION)..."
	@zip -qr $(EXTENSION_NAME)-$(VERSION).zip * --exclude '.*' Makefile
	@echo "Package created: $(EXTENSION_NAME)-$(VERSION).zip"
