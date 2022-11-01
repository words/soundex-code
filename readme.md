# soundex-code

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

[Soundex][wiki] phonetic algorithm.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`soundex(value[, maxLength])`](#soundexvalue-maxlength)
*   [CLI](#cli)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Related](#related)
*   [Contribute](#contribute)
*   [Security](#security)
*   [License](#license)

## What is this?

This package exposes a phonetic algorithm.
That means it gets a certain string (typically a human name), and turns it into
a code, which can then be compared to other codes (of other names), to check if
they are (likely) pronounced the same.

## When should I use this?

You’re probably dealing with natural language, and know you need this, if
you’re here!

Soundex is one of the earlier phonetics algorithms, specifically designed for
surnames, inspiring others such as [`metaphone`][metaphone].
`metaphone` (and [`double-metaphone`][double-metaphone]) are better.

Depending on your goals, you likely want to additionally use a stemmer (such as
[`stemmer`][stemmer]).

## Install

This package is [ESM only][esm].
In Node.js (version 14.14+, 16.0+), install with [npm][]:

```sh
npm install soundex-code
```

In Deno with [`esm.sh`][esmsh]:

```js
import {soundex} from 'https://esm.sh/soundex-code@2'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {soundex} from 'https://esm.sh/soundex-code@2?bundle'
</script>
```

## Use

```js
import {soundex} from 'soundex-code'

soundex('phonetics') // => 'P532'
soundex('Ashcraft') // => 'A261'
soundex('Lissajous') // => 'L222'
soundex('Smith') === soundex('Schmit') // => true

soundex('Ashcraftersson', 6) // => 'A26136'
soundex('A', 6) // => 'A000'
```

## API

This package exports the identifier `soundex`.
There is no default export.

### `soundex(value[, maxLength])`

Get the soundex key from a given value.

###### `value`

Value to use (`string`, required).

###### `maxLength`

Create a code that is at most `maxLength` in size (`number`, default: `4`).
The minimum is always 4 (padded on the right).

##### Returns

Soundex key for `value` (`string`).

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

## Types

This package is fully typed with [TypeScript][].
It exports no additional types.

## Compatibility

This package is at least compatible with all maintained versions of Node.js.
As of now, that is Node.js 14.14+ and 16.0+.
It also works in Deno and modern browsers.

## Related

*   [`metaphone`][metaphone]
    — metaphone implementation
*   [`double-metaphone`][double-metaphone]
    — double metaphone implementation
*   [`stemmer`][stemmer]
    — porter stemmer algorithm
*   [`dice-coefficient`](https://github.com/words/dice-coefficient)
    — sørensen–dice coefficient
*   [`levenshtein-edit-distance`](https://github.com/words/levenshtein-edit-distance)
    — levenshtein edit distance
*   [`syllable`](https://github.com/words/syllable)
    — syllable count in an English word

## Contribute

Yes please!
See [How to Contribute to Open Source][contribute].

## Security

This package is safe.

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

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[contribute]: https://opensource.guide/how-to-contribute/

[license]: license

[author]: https://wooorm.com

[wiki]: https://en.wikipedia.org/wiki/Soundex

[metaphone]: https://github.com/words/metaphone

[double-metaphone]: https://github.com/words/double-metaphone

[stemmer]: https://github.com/words/stemmer
