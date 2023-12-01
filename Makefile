EXTENSION_NAME := url-regex-replace
VERSION := $(shell jq -r '.version' manifest.json)

package: clean
	@echo "Packaging $(EXTENSION_NAME) version $(VERSION)..."
	@zip -qr $(EXTENSION_NAME)-$(VERSION).zip * --exclude '.*' 'images/*' Makefile 'node_modules' 'package.json' 'package-lock.json' 
	@echo "Package created: $(EXTENSION_NAME)-$(VERSION).zip"

list:
	@unzip -l $(EXTENSION_NAME)-$(VERSION).zip

clean:
	[[ -f $(EXTENSION_NAME)-$(VERSION).zip ]] && echo "Removing $(EXTENSION_NAME)-$(VERSION).zip..." || echo "No $(EXTENSION_NAME)-$(VERSION).zip to remove."
	[[ -f $(EXTENSION_NAME)-$(VERSION).zip ]] && rm -v $(EXTENSION_NAME)-$(VERSION).zip || echo "No $(EXTENSION_NAME)-$(VERSION).zip to remove."
	# @rm -v $(EXTENSION_NAME)-$(VERSION).zip

clean-all:
	# @echo "Removing all $(EXTENSION_NAME)-*.zip..."
	# @rm -v $(EXTENSION_NAME)-*.zip
	fd -HI -e zip -x rm -v {}

.PHONY: package list clean