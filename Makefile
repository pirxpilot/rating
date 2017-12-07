PROJECT=rating
NODE_BIN=./node_modules/.bin


all: check build

check: lint

lint: | node_modules
	$(NODE_BIN)/jshint index.js

build: build/build.js build/build.css

build/build.js: node_modules index.js
	mkdir -p build
	$(NODE_BIN)/browserify --require ./index.js:$(PROJECT) --outfile $@

build/build.css: rating.css
	cp $< $@

node_modules: package.json
	npm install && touch $@

clean:
	rm -fr build node_modules

.PHONY: clean lint check all build
