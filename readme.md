# soundex-code

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

[Soundex][wiki] phonetic algorithm.

Soundex is one of the earlier phonetics algorithms, specifically designed for
surnames, inspiring others such as [`metaphone`][metaphone].

Depending on your goals, additionally use a stemmer (such as
[`stemmer`][stemmer]).

## Install

This package is ESM only: Node 12+ is needed to use it and it must be `import`ed
instead of `require`d.

[npm][]:

```sh
npm install soundex-code
```

## API

This package exports the following identifiers: `soundex`.
There is no default export.

```js
import {soundex} from 'soundex-code'

soundex('phonetics') // => 'P532'
soundex('Ashcraft') // => 'A261'
soundex('Lissajous') // => 'L222'
soundex('Smith') === soundex('Schmit') // => true

soundex('Ashcraftersson', 6) // => 'A26136'
soundex('A', 6) // => 'A000'
```

## CLI

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

## Related

*   [`metaphone`](https://github.com/words/metaphone)
    — Metaphone implementation
*   [`double-metaphone`](https://github.com/words/double-metaphone)
    — Double Metaphone implementation
*   [`stemmer`](https://github.com/words/stemmer)
    — Porter Stemmer algorithm
*   [`dice-coefficient`](https://github.com/words/dice-coefficient)
    — Sørensen–Dice coefficient
*   [`levenshtein-edit-distance`](https://github.com/words/levenshtein-edit-distance)
    — Levenshtein edit distance
*   [`syllable`](https://github.com/words/syllable)
    — Syllable count in an English word

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/words/soundex-code/workflows/main/badge.svg

[build]: https://github.com/words/soundex-code/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/words/soundex-code.svg

[coverage]: https://codecov.io/github/words/soundex-code

[downloads-badge]: https://img.shields.io/npm/dm/soundex-code.svg

[downloads]: https://www.npmjs.com/package/soundex-code

[size-badge]: https://img.shields.io/bundlephobia/minzip/soundex-code.svg

[size]: https://bundlephobia.com/result?p=soundex-code

[npm]: https://www.npmjs.com

[license]: license

[author]: https://wooorm.com

[wiki]: https://en.wikipedia.org/wiki/Soundex

[metaphone]: https://github.com/words/metaphone

[stemmer]: https://github.com/words/stemmer
