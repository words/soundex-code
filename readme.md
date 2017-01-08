# soundex-code [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

[Soundex][wiki] phonetic algorithm.

Soundex is one of the earlier phonetics algorithms, specifically
designed for surnames, inspiring others such as [metaphone][].

Depending on your goals, additionally use a stemmer (such as
[stemmer][]).

## API

Install:

```bash
npm install soundex-code
```

Use:

```js
var soundex = require('soundex-code');

soundex('phonetics'); // 'P532'
soundex('Ashcraft'); // 'A261'
soundex('Lissajous'); // 'L222'
soundex('Smith') === soundex('Schmit'); // true

soundex('Ashcraftersson', 6); // 'A26136'
soundex('A', 6); // 'A000'
```

## CLI

Install:

```sh
npm install -g soundex-code
```

Use:

```txt
Usage: soundex-code [options] <words...>

  Soundex phonetic algorithm.

Options:

  -h, --help           output usage information
  -v, --version        output version number

Usage:

# output phonetics
$ soundex-code phonetics unicorn
P532 U526

# output phonetics from stdin
$ echo "phonetics banana" | soundex-code
P532 B550
```

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/soundex-code.svg

[travis]: https://travis-ci.org/wooorm/soundex-code

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/soundex-code.svg

[codecov]: https://codecov.io/github/wooorm/soundex-code

[license]: LICENSE

[author]: http://wooorm.com

[wiki]: http://en.wikipedia.org/wiki/Soundex

[metaphone]: https://github.com/wooorm/metaphone

[stemmer]: https://github.com/wooorm/stemmer
