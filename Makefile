PROJECT=rating
NODE_BIN=./node_modules/.bin
SRC = index.js
CSS = rating.css

all: check compile

check: lint

compile: build/build.js build/build.css

build:
	mkdir -p $@

build/build.css: $(CSS) | build
	cat $^ > $@

build/build.js: node_modules $(SRC) | build
	$(NODE_BIN)/esbuild \
		--bundle \
		--global-name=rating \
		--outfile=$@ \
		index.js

node_modules: package.json
	yarn
	touch $@

lint: | node_modules
	$(NODE_BIN)/biome ci

format: | node_modules
	$(NODE_BIN)/biome check --fix

clean:
	rm -fr build node_modules

.PHONY: clean lint format check all compile
