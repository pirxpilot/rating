[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

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

[npm-image]: https://img.shields.io/npm/v/ro-rating.svg
[npm-url]: https://npmjs.org/package/ro-rating

[travis-url]: https://travis-ci.org/pirxpilot/rating
[travis-image]: https://img.shields.io/travis/pirxpilot/rating.svg

