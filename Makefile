EXTENSION_NAME := prepend-url
VERSION := $(shell jq -r '.version' manifest.json)

package: clean
	@echo "Packaging $(EXTENSION_NAME) version $(VERSION)..."
	@zip -qr $(EXTENSION_NAME)-$(VERSION).zip * --exclude '.*' 'images/*' Makefile
	@echo "Package created: $(EXTENSION_NAME)-$(VERSION).zip"

list:
	@unzip -l $(EXTENSION_NAME)-$(VERSION).zip

clean:
	@rm -v $(EXTENSION_NAME)-$(VERSION).zip

.PHONY: package list clean