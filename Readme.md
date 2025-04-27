[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]

# rating

  Read-only numeric rating (0-100) displayed as stars.
  Click [here](http://pirxpilot.github.com/rating) to see the example.

## Installation

    $ npm install ro-rating

## API

### rating(el, value)

Add rating component to `el` and display the `value`


### rating(el, options)

options is an object that allows specifying alternative star character and/or initial value

````javascript
var rating = require('rating');

// use ★ and initial value 25
rating(parent, 25);

// use ❤ and initial value 50
rating(parent, {
  value: 50,
  star: '&#x2764;'  // ❤
});
````

### rating.set(value)

Change the `value` of existing rating.


## License

  MIT

MIT © [Damian Krzeminski](https://pirxpilot.me)

[npm-image]: https://img.shields.io/npm/v/ro-rating
[npm-url]: https://npmjs.org/package/ro-rating

[build-url]: https://github.com/pirxpilot/rating/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/pirxpilot/rating/check.yaml?branch=main

