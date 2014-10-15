# soundex-code [![Build Status](https://travis-ci.org/wooorm/soundex-code.svg?branch=master)](https://travis-ci.org/wooorm/soundex-code) [![Coverage Status](https://img.shields.io/coveralls/wooorm/soundex-code.svg)](https://coveralls.io/r/wooorm/soundex-code?branch=master)

The [Soundex](http://en.wikipedia.org/wiki/Soundex) algorithm in JavaScript. No cruft. Real fast.

Soundex is one of the earlier phonetics algorithms, specifically designed for surnames, inspiring others such as [metaphone](https://github.com/wooorm/metaphone).

Depending on your goals, additionally use a stemmer (e.g., my own porter stemmer [implementation](https://github.com/wooorm/stemmer)) for better results.

## Installation

npm:
```sh
$ npm install soundex-code
```

Component:
```sh
$ component install wooorm/soundex-code
```

Bower:
```sh
$ bower install soundex-code
```

## Usage

```js
var soundexCode = require('soundex-code');

soundexCode("phonetics"); // "P532"
soundexCode("Ashcraft"); // "A261"
soundexCode("Lissajous"); // "L222"
soundexCode("Smith") === soundex-code("Schmit"); // true

soundexCode("Ashcraftersson", 6); // "A26136"
soundexCode("A", 6); // "A000"
```

## Other Soundex implementations

- [NaturalNode/natural](https://github.com/NaturalNode/natural);
- [LouisT/node-soundex](https://github.com/LouisT/node-soundex);
- [derrickpelletier/soundex-encode](https://github.com/derrickpelletier/soundex-encode);
- [Yomguithereal/clj-fuzzy](https://github.com/Yomguithereal/clj-fuzzy).

## Benchmark

On a MacBook Air, it runs about 516,000 op/s.

```
           soundexCode — this module
  410 op/s » op/s * 1,000

           natural
  182 op/s » op/s * 1,000

           soundex-encode
   45 op/s » op/s * 1,000

           soundex
   30 op/s » op/s * 1,000

           clj-fuzzy
   20 op/s » op/s * 1,000
```

## Related

- [metaphone](https://github.com/wooorm/metaphone) — The orignal Metaphone algorithm;
- [double-metaphone](https://github.com/wooorm/metaphone) — The Double Metaphone algorithm.

## License

MIT © Titus Wormer
