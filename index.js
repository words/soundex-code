// Minimum length of Soundex keys.
var minLength = 4

// Soundex values belonging to characters.
// This map also includes vowels (with a value of 0) to easily distinguish
// between an unknown value or a vowel.
/** @type {Record<string, number>} */
var map = {}

map.a = map.e = map.i = map.o = map.u = map.y = 0
map.b = map.f = map.p = map.v = 1
map.c = map.g = map.j = map.k = map.q = map.s = map.x = map.z = 2
map.d = map.t = 3
map.l = 4
map.m = map.n = 5
map.r = 6

/**
 * Get the soundex key from a given value.
 *
 * @param {string} value
 * @param {number} [maxLength=4]
 * @returns {string}
 */
export function soundex(value, maxLength) {
  var lowercase = String(value).toLowerCase()
  /** @type {Array.<string|number>} */
  var results = []
  var index = -1
  /** @type {string} */
  var character
  /** @type {number|undefined} */
  var previous
  /** @type {number|undefined} */
  var phonetics

  while (++index < lowercase.length) {
    character = lowercase.charAt(index)
    phonetics = map[character]

    if (index === 0) {
      // Initial letter
      results.push(character.toUpperCase())
    } else if (phonetics && phonetics !== previous) {
      // Phonetics value
      results.push(phonetics)
    } else if (phonetics === 0) {
      // Vowel
      phonetics = undefined
    } else {
      // Unknown character (including H and W)
      phonetics = previous
    }

    previous = phonetics
  }

  return pad(results.join('')).slice(0, maxLength || minLength)
}

/**
 * Pad a given value with zero characters. The function only pads four characters.
 *
 * @param {string} value
 * @returns {string}
 */
function pad(value) {
  var length = minLength - value.length
  var index = -1

  while (++index < length) {
    value += '0'
  }

  return value
}
